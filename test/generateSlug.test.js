import { expect } from "chai";
import { generateSlug } from "../src/utils/generateSlug.js";

import { ValidationError } from "../src/utils/customErrors.js";

describe("test generateSlug", function () {
    it("Devrait générer un slug valide pour un nom simple", function () {
        const slug = generateSlug("Garfield", 123);
        expect(slug).to.equal("garfield-123");
    });

    it("Devrait générer un slug valide si id est de type string", function () {
        const slug = generateSlug("SPA du 06", "102");
        expect(slug).to.equal("spa-du-06-102");
    });

    it("Devrait générer un slug valide si nom avec accents et caractères spéciaux", function () {
        const slug = generateSlug("pénélope@te_st", 456);
        expect(slug).to.equal("penelopetest-456");
    });

    it("Devrait enlever les surplus d'espaces et retourner un slug valide", function () {
        const slug = generateSlug(" Michel Dupont ", 789);
        expect(slug).to.equal("michel-dupont-789");
    });

    it("Devrait enlever les caractères non-alphanumerique", function () {
        const slug = generateSlug("Mon film #1 !!!", 101);
        expect(slug).to.equal("mon-film-1-101");
    });

    it("Devrait enlever les tirets s'ils sont aux extrémités", function () {
        const slug = generateSlug("  --Titre De l'Article--  ", 102);
        expect(slug).to.equal("titre-de-larticle-102");
    });

    it("Devrait lancer une erreur si name est vide/null", function () {
        expect(() => generateSlug("", 1000).to.throw(Error));
    });

    it("Devrait lancer une erreur si id est vide/null", function () {
        expect(() => generateSlug("Toto").to.throw(Error));
    });

    it("Devrait lancer une erreur si id n'est pas de type string ou number", function () {
        expect(() => generateSlug("Toto", ["1"]).to.throw(Error));
    });

    it("Devrait lancer une erreur si name  n'est pas de type string", function () {
        expect(() => generateSlug(["Toto"], "1").to.throw(Error));
    });
});
