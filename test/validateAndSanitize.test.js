import { expect } from "chai";

import { validateAndSanitize } from "../src/utils/validateAndSanitize.js";

describe("test validateAndSanitize functions", () => {
    describe("test animalStore validation", () => {
        it("devrait valider les données si elles correspondent au schéma", () => {
            const data = {
                name: "Garfield",
                species: "Chat",
                age: "2",
                size: "Petit",
                gender: "Mâle",
                race: "Européen",
                description: "Ceci est une description",
                availability: true,
            };
            const { error, value } = validateAndSanitize.animalStore.validate(data);
            expect(error).to.be.undefined;
            expect(value).to.deep.equal(data);
        });

        it("Devrait retourner une erreur si une donnée requise est manquante", () => {
            const data = {
                //name: "Garfield",
                species: "Chat",
                age: "2",
                size: "Petit",
                gender: "Mâle",
                race: "Européen",
                description: "Ceci est une description",
                availability: true,
            };
            const { error } = validateAndSanitize.animalStore.validate(data);

            expect(error).to.not.be.undefined;
            expect(error.details[0].message).to.include('"name" is required');
        });

        it("devrait retourner une erreur si le type d'une donnée ne correspond pas au schéma", () => {
            const data = {
                name: 123,
                species: "Chat",
                age: "2",
                size: "Petit",
                gender: "Mâle",
                race: "Européen",
                description: "Ceci est une description",
                availability: true,
            };
            const { error } = validateAndSanitize.animalStore.validate(data);

            expect(error).to.not.be.undefined;
            expect(error.details[0].message).to.include('"name" must be a string');
        });

        it("devrait retourner une erreur si une donnée est sanitizée", () => {
            const data = {
                name: "<a>Garfield</a>",
                species: "Chat",
                age: "2",
                size: "Petit",
                gender: "Mâle",
                race: "Européen",
                description: "Ceci est une description",
                availability: true,
            };
            const { error } = validateAndSanitize.animalStore.validate(data);

            expect(error).to.not.be.undefined;
            expect(error.details[0].type).to.equal("string.sanitized");
        });
    });
});
