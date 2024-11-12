import { Family, Association, User, sequelize } from "../models/associations.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { AuthentificationError, ValidationError } from "../utils/customErrors.js";
import bcrypt from "bcrypt";
import { createAuthToken } from "../utils/createAuthToken.js";
import { geocodeAddress } from "../utils/geocodeAdress.js";
import { getRelativePathOfImage } from "../utils/imageManager.js";
import { generateSlug } from "../utils/generateSlug.js";
import { sendConfirmationEmailDev } from "../utils/sendEmail/sendConfirmationEmailDev.js";

const authController = {
    register: async (req, res, next) => {
        const { type } = req.params;

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
            email_association,
        } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return next(new AuthentificationError("Impossible de compléter l'inscription"));
        }

        if (password !== confirmPassword) {
            return next(new AuthentificationError("Les mots de passe ne correspondent pas."));
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
                let relativePathImage;
                // Si la famille a uploadé une image
                if (Object.keys(req.files).length !== 0) {
                    relativePathImage = getRelativePathOfImage(req.absolutePathImage);
                }

                createdEntity = await Family.create(
                    {
                        name,
                        address,
                        zip_code,
                        city,
                        department_id,
                        phone_number,
                        description,
                        url_image: relativePathImage ? relativePathImage : undefined,
                        // si pas d'image url_image = undefined donc champ ignoré par Sequelize (on a une image par défaut définie sur la table)
                    },
                    { transaction },
                );
            } else if (type === "association") {
                // Vérifier que l'association a fourni l'image
                if (!req.files || Object.keys(req.files).length === 0) {
                    return next(
                        new ValidationError("association_img", "Le champ image est obligatoire."),
                    );
                }
                try {
                    const { latitude: geoLat, longitude: geoLon } = await geocodeAddress(
                        `${address}, ${zip_code}, ${city}`,
                    );
                    latitude = geoLat;
                    longitude = geoLon;
                } catch (error) {
                    await transaction.rollback();
                    return next(error);
                }
                const relativePathImage = getRelativePathOfImage(req.absolutePathImage);
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
                        email_association,
                        url_image: relativePathImage ? relativePathImage : undefined,
                    },
                    { transaction },
                );
            } else {
                // Si type != de association ou family
                return next(new ValidationError("Type non autorisé"));
            }

            const slug = generateSlug(createdEntity.name, createdEntity.id);

            await createdEntity.update({
                    slug: slug,
                },
                { transaction },
            );

            const user = await User.create(
                {
                    email,
                    password: hashedPassword,
                    role,
                    family_id: type === "family" ? createdEntity.id : null,
                    association_id: type === "association" ? createdEntity.id : null,
                },
                { transaction },
            );

            await sendConfirmationEmailDev(email);

            await transaction.commit();

            const userWithoutPassword = await User.findByPk(user.id, {
                include: [
                    { association: "association", include: "department" },
                    { association: "family", include: "department" },
                ],
                attributes: { exclude: ["password"] },
            });
            /* Creation du token et envoi dans le cookie, token et cookie valide 3h */
            const authToken = createAuthToken(
                userWithoutPassword.id,
                userWithoutPassword.role,
                userWithoutPassword.family_id,
                userWithoutPassword.association_id,
            );

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
            return next(new AuthentificationError());
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
            return next(new AuthentificationError());
        }

        const userWithoutPassword = user.get({ plain: true });
        delete userWithoutPassword.password;
        /* Creation du token et envoi dans le cookie, token et cookie valide 3h */
        const authToken = createAuthToken(
            userWithoutPassword.id,
            userWithoutPassword.role,
            userWithoutPassword.family_id,
            userWithoutPassword.association_id,
        );
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
