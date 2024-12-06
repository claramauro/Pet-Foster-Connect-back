import { expect } from "chai";
import sinon from "sinon";
import request from "supertest";

import { app } from "../app.js";
import { Animal } from "../src/models/Animal.js";
import { NotFoundError } from "../src/utils/customErrors.js";

describe("test animalController", () => {
    // it("devrait retourner une liste d'animaux", async () => {
    //     const animals = [
    //         { id: 1, name: "Garfield", species: "Chat" },
    //         { id: 2, name: "Snoopy", species: "Chien" },
    //     ];

    //     const findStub = sinon.stub(Animal, "findAll").resolves(animals);

    //     const response = await request(app).get("/animals");

    //     console.log(response.body);

    //     expect(response.status).to.equal(200);

    //     findStub.restore();
    // });

    describe("test findOne method", () => {
        const animal = { id: 1, name: "Garfield", species: "Chat" };

        let findOneStub;
        beforeEach(() => {
            findOneStub = sinon.stub(Animal, "findByPk");
        });

        afterEach(() => {
            findOneStub.restore();
        });

        it("Devrait appeler findByPk avec l'id présent dans l'url (req.params)", async () => {
            findOneStub.resolves(animal);

            await request(app).get(`/animals/${animal.id}`);

            const findByPkArgs = findOneStub.getCall(0).args[0];

            expect(findOneStub.calledOnce).to.be.true;
            expect(findByPkArgs).to.equal(animal.id.toString());
        });

        it("Devrait retourner l'animal et une réponse 200", async () => {
            findOneStub.resolves(animal);

            const response = await request(app).get(`/animals/${animal.id}`);

            expect(response.body).to.deep.equal(animal);
            expect(response.status).to.equal(200);
        });

        it("Devrait lancer une erreur NotFound avec un code 404 si aucun animal correspondant", async () => {
            findOneStub.resolves(null);

            let response;
            try {
                response = await request(app).get(`/animals/${animal.id}`);
            } catch (error) {
                expect(error).to.be.instanceof(NotFoundError);
                expect(response.status).to.equal(404);
            }
        });
    });

    describe("test filter method", () => {
        let findAllStub;
        beforeEach(() => {
            findAllStub = sinon.stub(Animal, "findAll");
        });

        afterEach(() => {
            findAllStub.restore();
        });

        const animals = [
            { id: 1, name: "Garfield", species: "Chat" },
            { id: 2, name: "Snoopy", species: "Chien" },
            { id: 2, name: "Felix", species: "Chat" },
            { id: 2, name: "Idefix", species: "Chien" },
            { id: 2, name: "Milou", species: "Chien" },
            { id: 2, name: "Scooby-Doo", species: "Chien" },
            { id: 2, name: "Gipsy", species: "Chat" },
            { id: 2, name: "Bella", species: "Chien" },
            { id: 2, name: "Toto", species: "Chien" },
            { id: 2, name: "Titi", species: "Chien" },
        ];

        it("Devrait retourner des animaux même si pas de query dans l'url", async () => {
            findAllStub.resolves(animals);

            const response = await request(app).get("/animals/search");

            expect(response.status).to.equal(200);
            expect(response.body.totalAnimalCount).to.equal(animals.length);
        });

        it("Pagination : devrait retourner 6 animaux maximum", async () => {
            findAllStub.resolves(animals);

            const response = await request(app).get("/animals/search");

            expect(response.body.paginatedAnimals).to.have.lengthOf.at.most(6);
        });

        it("Devrait appliquer les filtres dans findAll", async () => {
            findAllStub.resolves(animals);

            await request(app).get("/animals/search?species=Chien");

            const findAllArgs = findAllStub.getCall(0).args[0];

            expect(findAllArgs).to.have.property("where");
            expect(findAllArgs.where).to.have.property("species");
            expect(findAllArgs.where.species).to.equal("Chien");
        });
    });
});
