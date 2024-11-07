import { Family, Association, User, sequelize } from "../models/associations.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { ValidationError } from "../utils/customErrors.js";
import bcrypt from "bcrypt";
import { createAuthToken } from "../utils/createAuthToken.js";
import { geocodeAddress } from "../utils/geocodeAdress.js";

const authController = {
    register: async (req, res, next) => {
        const { type } = req.params;

        console.log(req.body);

        const { error, value } = validateAndSanitize.familyOrAssociationRegister.validate(req.body);
        if (error) {
            return next(new ValidationError(error.name, error.message));
        }

        const {
            name,
            address,
            zip_code,
            city,
            department_id,
            phone_number,
            email,
            password,
            confirmPassword,
            role,
            description,
        } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const transaction = await sequelize.transaction();

        // Création de deux variables en let car valeurs changeront lors de l'interrogation de l'API

        let latitude = null;
        let longitude = null;

        try {
            let createdEntity;

            // Créer soit une famille soit une association selon req.params
            if (type === "family") {
                createdEntity = await Family.create(
                    {
                        name,
                        address,
                        zip_code,
                        city,
                        department_id,
                        phone_number,
                        description,
                    },
                    { transaction }
                );
            } else if (type === "association") {
                try {
                    const { latitude: geoLat, longitude: geoLon } = await geocodeAddress(
                        `${address}, ${zip_code}, ${city}`
                    );
                    latitude = geoLat;
                    longitude = geoLon;
                } catch (error) {
                    await transaction.rollback();
                    return res.status(400).json({ error: error.message });
                }

                createdEntity = await Association.create(
                    {
                        name,
                        address,
                        zip_code,
                        city,
                        department_id,
                        phone_number,
                        longitude,
                        latitude,
                        description,
                    },
                    { transaction }
                );
            }

            const user = await User.create(
                {
                    email,
                    password: hashedPassword,
                    role,
                    family_id: type === "family" ? createdEntity.id : null,
                    association_id: type === "association" ? createdEntity.id : null,
                },
                { transaction }
            );

            await transaction.commit();

            const userWithoutPassword = await User.findByPk(user.id, {
                include: [
                    { association: "association", include: "department" },
                    { association: "family", include: "department" },
                ],
                attributes: { exclude: ["password"] },
            });

            /* Creation du token et envoi dans le cookie, token et cookie valide 3h */
            const authToken = createAuthToken(userWithoutPassword.id, userWithoutPassword.role);

            res.setHeader("Authorization", `Bearer ${authToken}`);
            res.status(201).json(userWithoutPassword);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    },

    login: async (req, res, next) => {
        const { error, value } = validateAndSanitize.familyOrAssociationLogin.validate(req.body);

        if (error) {
            return next(new ValidationError(error));
        }

        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            include: [
                { association: "association", include: "department" },
                { association: "family", include: "department" },
            ],
        });

        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrecte" });
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(401).json({ message: "Email ou mot de passe incorrecte" });
        }

        const userWithoutPassword = user.get({ plain: true });
        delete userWithoutPassword.password;

        /* Creation du token et envoi dans le cookie, token et cookie valide 3h */
        const authToken = createAuthToken(userWithoutPassword.id, userWithoutPassword.role);
        res.setHeader("Authorization", `Bearer ${authToken}`);

        res.json(userWithoutPassword);
    },

    // logout: async (req, res) => {
    //     res.clearCookie("auth_token", {
    //         httpOnly: true,
    //         secure: false, // Secure à passer à true en prod
    //     });
    //
    //     res.status(200).json({ message: "Déconnexion réussie, cookie supprimé." });
    // },
};

export { authController };
