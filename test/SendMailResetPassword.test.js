// Imports
import { expect } from "chai";
import sinon from "sinon";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendMailResetPassword } from "../src/utils/sendEmail/sendMailResetPassword.js";

// Charger les variables d'environnement
dotenv.config();

describe("sendMailResetPassword", () => {
    let transporterStub;

    // Avant chaque test, on remplace la fonction `createTransport` pour éviter d'envoyer un email réel
    beforeEach(() => {
        transporterStub = sinon.stub(nodemailer, "createTransport").returns({
            sendMail: sinon.stub().resolves("Email envoyé avec succès"), // Simuler une réponse réussie
        });
    });

    // Après chaque test, on restaure la fonction d'origine
    afterEach(() => {
        transporterStub.restore();
    });

    it("devrait appeler sendMail avec les bons paramètres", async () => {
        const email = "toto@toto.com";

        // Appel de la fonction pour envoyer l'email
        await sendMailResetPassword(email);

        const sendMailArgs = transporterStub().sendMail.getCall(0).args[0];

        // Vérifier que sendMail a été appelé avec le bon email et lien
        expect(sendMailArgs.to).to.equal(email);
        expect(sendMailArgs.html).to.include("token=");
    });

    it("devrait générer un token valide contenant l'email", async () => {
        const email = "toto@toto.com";

        await sendMailResetPassword(email);

        const sendMailArgs = transporterStub().sendMail.getCall(0).args[0];
        const token = extractTokenFromHtml(sendMailArgs.html); // Extraire le token

        if (token.split(".").length !== 3) {
            throw new Error("Invalid token");
        }
        const payloadToken = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadToken)); // Décoder le token

        expect(decodedPayload.email).to.equal(email);
    });

    it("l'email devrait inclure un lien de réinitialisation avec le token", async () => {
        const email = "toto@toto.com";

        await sendMailResetPassword(email);

        const sendMailArgs = transporterStub().sendMail.getCall(0).args[0];
        const token = extractTokenFromHtml(sendMailArgs.html); // Extraire le token

        // Vérifier que le lien de réinitialisation est bien inclus dans le HTML de l'email
        expect(sendMailArgs.html).to.include(
            `${process.env.REACT_URL}/reinitialisation-mot-de-passe?token=${token}`
        );
    });

    it("devrait lancer une erreur en cas d'échec d'envoi de l'email", async () => {
        const email = "toto@toto.com";

        // Simuler un rejet de l'email (par exemple un problème d'authentification)
        transporterStub().sendMail.rejects(new Error("Échec de l'envoi"));

        expect(async () => await sendMailResetPassword(email).to.throw(Error));
    });

    it("devrait lancer une erreur si l'email est manquant", async () => {
        expect(async () => await sendMailResetPassword(null).to.throw(Error));
    });
});

// Helper function to extract the token from the HTML
function extractTokenFromHtml(html) {
    const tokenMatch = /token=([a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+)/.exec(html); // Regex to capture token
    if (!tokenMatch) {
        throw new Error("Token not found in the email HTML");
    }
    return tokenMatch[1]; // Return the payload token
}
