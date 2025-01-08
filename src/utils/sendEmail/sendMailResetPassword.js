import path from "node:path";
import fs from "node:fs";

import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

async function sendMailResetPassword(email) {
    if (!email) {
        throw new Error("L'argument email est obligatoire");
    }
    try {
        /* Création du token avec une expiration à 30 min */
        const resetToken = jwt.sign({ email }, process.env.JWT_RESET_PASSWORD_SECRET, {
            expiresIn: "30m",
        });

        /* Création du lien de réinitialisation du mot de passe avec le token */
        const resetLink = `${process.env.REACT_URL}/reinitialisation-mot-de-passe?token=${resetToken}`;

        // Récupérer l'html à insérer dans l'email
        const emailTemplateHtmlPath = path.join(import.meta.dirname, "htmlEmailResetPassword.html");
        let htmlContent = fs.readFileSync(emailTemplateHtmlPath, "utf-8");
        htmlContent = htmlContent.replace("{{resetLink}}", resetLink);
        htmlContent = htmlContent.replace(
            "{{logoUrl}}",
            `${process.env.REACT_URL}/assets/logo_name.webp`
        );

        // Détails du transporteur
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD, // Utilisez un mot de passe d'application si l'authentification 2FA est activée
            },
        });

        // Options de l'email
        const mailOptions = {
            from: process.env.GMAIL_EMAIL, // Email de l'expéditeur
            to: email, // Email du destinataire
            subject: "Réinitialiser le mot de passe - PetFoster Connect",
            html: htmlContent,
        };

        // Envoi de l'email et résultats
        const info = await transporter.sendMail(mailOptions);
        console.log("Email envoyé:", info.response);
        return { success: true, message: "Email envoyé avec succès" };
    } catch (error) {
        console.error("Erreur lors de l'envoi du mail:", error);
        console.error("Détails de l'erreur:", error.response);
        return { success: false, message: `Erreur: ${error.message}` };
    }
}

export { sendMailResetPassword };
