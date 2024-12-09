import { expect } from "chai";
import sinon from "sinon";
import jwt from "jsonwebtoken";
import { createAuthToken } from "../src/utils/createAuthToken.js";

describe("test createAuthToken function", () => {
    it("Devrait retourner un token valide (type string)", () => {
        const id = 2;
        const role = "association";
        const family_id = null;
        const association_id = 3;

        const token = createAuthToken(id, role, family_id, association_id);

        expect(token).to.be.a("string");
    });

    it("Devrait retourner un token avec un payload correct pour une association (family_id = null)", () => {
        const id = 2;
        const role = "association";
        const family_id = null;
        const association_id = 3;

        const token = createAuthToken(id, role, family_id, association_id);
        const encodedPayload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(encodedPayload));

        expect(decodedPayload.id).to.be.equal(id);
        expect(decodedPayload.role).to.be.equal(role);
        expect(decodedPayload.association_id).to.be.equal(association_id);
        expect(decodedPayload).to.not.have.property("family_id");
    });

    it("Devrait retourner un token avec un payload correct pour une famille (association_id = null)", () => {
        const id = 2;
        const role = "family";
        const family_id = 2;
        const association_id = null;

        const token = createAuthToken(id, role, family_id, association_id);
        const encodedPayload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(encodedPayload));

        expect(decodedPayload.id).to.be.equal(id);
        expect(decodedPayload.role).to.be.equal(role);
        expect(decodedPayload.family_id).to.be.equal(family_id);
        expect(decodedPayload).to.not.have.property("association_id");
    });

    it("Devrait lancer une erreur si id est null", () => {
        const id = null;
        const role = "family";
        const family_id = 2;
        const association_id = null;

        expect(() => createAuthToken(id, role, family_id, association_id).to.throw(Error));
    });
    it("Devrait lancer une erreur si role est null", () => {
        const id = 2;
        const role = null;
        const family_id = 2;
        const association_id = null;

        expect(() => createAuthToken(id, role, family_id, association_id).to.throw(Error));
    });

    it("Devrait lancer une erreur si une erreur se produit", () => {
        const id = "12";
        const role = "family";
        const family_id = "4";
        const association_id = null;

        const jwtSignStub = sinon.stub(jwt, "sign");

        // Simuler une erreur dans jwt.sign en utilisant throws
        jwtSignStub.throws(new Error("JWT signing error"));

        expect(() => createAuthToken(id, role, family_id, association_id)).to.throw(Error);

        jwtSignStub.restore();
    });
});
