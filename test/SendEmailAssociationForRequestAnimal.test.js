import { expect } from "chai";
import sinon from "sinon";

import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { sendEmailAssociationForRequestAnimal } from "../src/utils/sendEmail/SendEmailAssociationForRequestAnimal.js";

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
    const emailContent = {
        familyName: "Toto",
        animalName: "Garfield",
        species: "chat",
    };

    it("devrait appeler sendMail une fois et envoyer l'email au bon destinataire", async () => {
        // Appel de la fonction pour envoyer l'email
        const { success } = await sendEmailAssociationForRequestAnimal(email, emailContent);

        const sendMailArgs = transporterStub().sendMail.getCall(0).args[0];

        expect(transporterStub().sendMail.calledOnce).to.be.true;
        expect(sendMailArgs.to).to.equal(email);
        expect(success).to.be.true;
    });

    it("devrait configurer les en-têtes d'email correctement", async () => {
        await sendEmailAssociationForRequestAnimal(email, emailContent);

        const sendMailArgs = transporterStub().sendMail.getCall(0).args[0];

        expect(sendMailArgs.from).to.equal(process.env.GMAIL_EMAIL);
        expect(sendMailArgs.to).to.equal(email);
        expect(sendMailArgs.subject).to.equal("Demande d'hébergement pour un animal");
        expect(sendMailArgs.html).to.be.a("string").and.not.empty;
    });

    it("l'email devrait inclure les données de la demande", async () => {
        await sendEmailAssociationForRequestAnimal(email, emailContent);

        const sendMailArgs = transporterStub().sendMail.getCall(0).args[0];

        expect(sendMailArgs.html).to.include(emailContent.familyName);
        expect(sendMailArgs.html).to.include(emailContent.animalName);
        expect(sendMailArgs.html).to.include(emailContent.species);
    });

    it("devrait retourner success à false et le message d'erreur en cas d'échec d'envoi de l'email", async () => {
        // Simuler un échec d'envoi de l'email
        transporterStub().sendMail.rejects(new Error("Échec de l'envoi"));

        const { success, message } = await sendEmailAssociationForRequestAnimal(
            email,
            emailContent
        );

        expect(success).to.be.false;
        expect(message).to.include("Échec de l'envoi");
    });

    it("devrait lancer une erreur si l'email est manquant", async () => {
        try {
            await sendEmailAssociationForRequestAnimal(null, emailContent);
            expect.fail("Erreur non lancée");
        } catch (error) {
            expect(error).to.be.instanceof(Error);
        }
    });
});
