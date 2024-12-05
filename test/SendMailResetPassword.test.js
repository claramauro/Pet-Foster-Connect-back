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

    const email = "toto@toto.com";

    it("devrait appeler sendMail une fois en envoyer l'email au bon destinataire", async () => {
        // Appel de la fonction pour envoyer l'email
        await sendMailResetPassword(email);

        const sendMailArgs = transporterStub().sendMail.getCall(0).args[0];

        // Vérifier que sendMail a été appelé avec le bon email et lien
        expect(transporterStub().sendMail.calledOnce).to.be.true;
        expect(sendMailArgs.to).to.equal(email);
    });

    it("devrait configurer les en-têtes d'email correctement", async () => {
        await sendMailResetPassword(email);

        const sendMailArgs = transporterStub().sendMail.getCall(0).args[0];

        expect(sendMailArgs.from).to.equal(process.env.GMAIL_EMAIL);
        expect(sendMailArgs.to).to.equal(email);
        expect(sendMailArgs.subject).to.equal("Réinitialiser le mot de passe - PetFoster Connect");
        expect(sendMailArgs.html).to.be.a("string").and.not.empty;
    });

    it("devrait générer un token valide contenant l'email", async () => {
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
        await sendMailResetPassword(email);

        const sendMailArgs = transporterStub().sendMail.getCall(0).args[0];
        const token = extractTokenFromHtml(sendMailArgs.html); // Extraire le token

        // Vérifier que le lien de réinitialisation est bien inclus dans le HTML de l'email
        expect(sendMailArgs.html).to.include(
            `${process.env.REACT_URL}/reinitialisation-mot-de-passe?token=${token}`
        );
    });

    it("devrait retourner success à false et le message d'erreur en cas d'échec d'envoi de l'email", async () => {
        // Simuler un échec d'envoi de l'email
        transporterStub().sendMail.rejects(new Error("Échec de l'envoi"));

        const { success, message } = await sendMailResetPassword(email);

        expect(success).to.be.false;
        expect(message).to.include("Échec de l'envoi");
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
