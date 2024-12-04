import { expect } from "chai";
import sinon from "sinon";
import jwt from "jsonwebtoken";
import { createAuthToken } from "../src/utils/createAuthToken.js";

describe("test createAuthToken function", () => {
    it("Should return a valid token (string)", () => {
        const id = 2;
        const role = "association";
        const family_id = null;
        const association_id = 3;

        const token = createAuthToken(id, role, family_id, association_id);

        expect(token).to.be.a("string");
    });

    it("Should return a token with correct payload for association (family_id = null)", () => {
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

    it("Should return a token with correct payload for family (association_id = null)", () => {
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

    it("Should return an error if id is null", () => {
        const id = null;
        const role = "family";
        const family_id = 2;
        const association_id = null;

        expect(() => createAuthToken(id, role, family_id, association_id).to.throw(Error));
    });
    it("Should return an error if role is null", () => {
        const id = 2;
        const role = null;
        const family_id = 2;
        const association_id = null;

        expect(() => createAuthToken(id, role, family_id, association_id).to.throw(Error));
    });

    it("should throw an error if jwt.sign fail", () => {
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
