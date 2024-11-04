import { Family, Association, User } from "../models/associations.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { ValidationError } from "../utils/customErrors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAuthToken } from "../utils/createAuthToken.js";

const authController = {


    register: async (req, res, next) => {
        const { type } = req.params;

        const { error, value } = validateAndSanitize.familyOrAssociationRegister.validate(req.body);
        if (error) {
            return next(new ValidationError(error));
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
        } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Les mots de passe ne correspondent pas." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let createdEntity;
        // Créer soit une famille soit une association selon req.params
        if (type === "family") {
            createdEntity = await Family.create({
                name,
                address,
                zip_code,
                city,
                department_id,
                phone_number,
            });
        } else if (type === "association") {
            createdEntity = await Association.create({
                name,
                address,
                zip_code,
                city,
                department_id,
                phone_number,
            });
        } else {
            return res.status(400).json({ error: "Type non valide. Utilisez 'family' ou 'association'." });
        }

        const user = await User.create({
            email,
            password: hashedPassword,
            role,
            family_id: type === "family" ? createdEntity.id : null,
            association_id: type === "association" ? createdEntity.id : null,
        });

        const userWithoutPassword = user.get({ plain: true });
        delete userWithoutPassword.password;

        /* Creation du token et envoi dans le cookie, token et cookie valide 3h */
        const authToken = createAuthToken(userWithoutPassword);
        res.cookie("auth_token", authToken, { httpOnly: true, secure: false, maxAge: 3 * 60 * 60 * 1000 }); // Secure à passer à true en prod

        res.json({ data: createdEntity, user: userWithoutPassword });
    },


    login: async (req, res) => {
        /*
        connect and authenticated the user
        */
    },

    logout: async (req, res) => {
        /*
       disconnect and unauthenticated the user
         */
    },


};

export { authController };