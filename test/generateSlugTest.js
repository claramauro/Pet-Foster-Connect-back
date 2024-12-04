import { expect } from "chai";
import { generateSlug } from "../src/utils/generateSlug.js";

import { ValidationError } from "../src/utils/customErrors.js";

describe("test generateSlug", function () {
    it("should generate a correct slug for a simple name", function () {
        const slug = generateSlug("Garfield", 123);
        expect(slug).to.equal("garfield-123");
    });

    it("should generate a correct slug if type of id is string", function () {
        const slug = generateSlug("SPA du 06", "102");
        expect(slug).to.equal("spa-du-06-102");
    });

    it("should generate a correct slug with accents and special characters", function () {
        const slug = generateSlug("pénélope@te_st", 456);
        expect(slug).to.equal("penelopetest-456");
    });

    it("should handle extra spaces and return a valid slug", function () {
        const slug = generateSlug(" Michel Dupont ", 789);
        expect(slug).to.equal("michel-dupont-789");
    });

    it("should remove non-alphanumeric characters", function () {
        const slug = generateSlug("Mon film #1 !!!", 101);
        expect(slug).to.equal("mon-film-1-101");
    });

    it("should remove leading and trailing dashes", function () {
        const slug = generateSlug("  --Titre De l'Article--  ", 102);
        expect(slug).to.equal("titre-de-larticle-102");
    });

    it("should throw an Error if name is empty", function () {
        expect(() => generateSlug("", 1000).to.throw(Error));
    });

    it("should throw an Error if id is empty", function () {
        expect(() => generateSlug("Toto").to.throw(Error));
    });

    it("should throw an Error if id is not string or number", function () {
        expect(() => generateSlug("Toto", ["1"]).to.throw(Error));
    });

    it("should throw an Error if name is not string", function () {
        expect(() => generateSlug(["Toto"], "1").to.throw(Error));
    });
});
