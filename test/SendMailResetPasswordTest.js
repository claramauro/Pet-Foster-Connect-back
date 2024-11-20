// Imports 
import { expect } from 'chai';
import sinon from 'sinon';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendMailResetPassword } from "../src/utils/sendEmail/sendMailResetPassword.js";

// Charger les variables d'environnement
dotenv.config();

describe('sendMailResetPassword', () => {
    let transporterStub;

    // Avant chaque test, on remplace la fonction `createTransport` pour éviter d'envoyer un email réel
    beforeEach(() => {
        transporterStub = sinon.stub(nodemailer, 'createTransport').returns({
            sendMail: sinon.stub().resolves('Email envoyé avec succès'), // Simuler une réponse réussie
        });
    });

    // Après chaque test, on restaure la fonction d'origine
    afterEach(() => {
        transporterStub.restore();
    });

    // Test de la fonction sendMailResetPassword
    it('devrait générer un token et envoyer un email de réinitialisation', async () => {
        
        const email = 'philippe.perhirin0@gmail.com';

        // Appel à la fonction pour envoyer l'email
        const result = await sendMailResetPassword(email);

        // Vérifier que transporter a bien été appelé une fois pour envoyer l'email
        expect(transporterStub.calledOnce).to.be.true;

        // Vérifier que la méthode sendMail a été appelée avec les bons arguments
        const sendMailArgs = transporterStub().sendMail.getCall(0).args[0];

        // Vérifier que les bons paramètres ont été passés
        expect(sendMailArgs.to).to.equal(email);
        expect(sendMailArgs.subject).to.equal('Mot de passe oublié');
        expect(sendMailArgs.html).to.include('reinitialisation-mot-de-passe');
        expect(sendMailArgs.html).to.include('token=');

        // Vérifier que le token a été créé correctement dans l'URL
        const token = extractTokenFromHtml(sendMailArgs.html);

        // Décoder le token et vérifier son contenu
        const decodedToken = jwt.decode(token);  // Décoder le token
        expect(decodedToken.email).to.equal(email);
    });

    // Test pour vérifier l'échec en cas d'email invalide
    it('devrait échouer si l\'email est invalide', async () => {
        // Simuler un rejet de l'email (par exemple un problème d'authentification)
        transporterStub().sendMail.rejects(new Error('Problème d\'envoi'));

        try {
            // Essayer d'envoyer un email avec un email invalide
            await sendMailResetPassword('invalid-email@example.com');
        } catch (error) {
            // Vérifier que l'erreur retournée est celle que nous avons simulée
            expect(error.message).to.equal('Problème d\'envoi');
        }
    });
});

// Helper function to extract the token from the HTML
function extractTokenFromHtml(html) {
    const tokenMatch = /token=([a-zA-Z0-9-_]+)/.exec(html); // Regex to capture token
    if (!tokenMatch) {
        throw new Error('Token not found in the email HTML');
    }
    return tokenMatch[1]; // Return the token part
}