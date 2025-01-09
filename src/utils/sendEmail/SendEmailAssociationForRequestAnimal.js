import path from "node:path";
import fs from "node:fs";

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function sendEmailAssociationForRequestAnimal(email, emailContent) {
    if (!email) {
        throw new Error("L'argument email est obligatoire");
    }
    try {
        // Détails du transporteur
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD, // Utilisez un mot de passe d'application si l'authentification 2FA est activée
            },
        });

        // Récupérer l'html à insérer dans l'email
        const emailTemplateHtmlPath = path.join(import.meta.dirname, "htmlEmailRequestAnimal.html");
        let htmlContent = fs.readFileSync(emailTemplateHtmlPath, "utf-8");
        htmlContent = htmlContent.replace(
            "{{frontUrl}}",
            `${process.env.REACT_URL}/tableau-de-bord/demandes`
        );
        htmlContent = htmlContent.replace(
            "{{logoUrl}}",
            `${process.env.REACT_URL}/assets/logo_name.png`
        );
        htmlContent = htmlContent.replace("{{familyName}}", emailContent.familyName);
        htmlContent = htmlContent.replace("{{animalSpecies}}", emailContent.species);
        htmlContent = htmlContent.replace("{{animalName}}", emailContent.animalName);

        // Options de l'email
        const mailOptions = {
            from: process.env.GMAIL_EMAIL, // Email de l'expéditeur
            to: email, // Email du destinataire
            subject: "Demande d'hébergement pour un animal",
            html: htmlContent,
        };

        // Envoi de l'email et résultats
        const info = await transporter.sendMail(mailOptions);
        console.log("Email envoyé:", info.response); // Affichage de la réponse

        // Résultat de l'envoi
        return { success: true, message: "Email envoyé avec succès" };
    } catch (error) {
        console.error("Erreur lors de l'envoi du mail:", error); // Gestion des erreurs
        return { success: false, message: `Erreur: ${error.message}` };
    }
}

export { sendEmailAssociationForRequestAnimal };
