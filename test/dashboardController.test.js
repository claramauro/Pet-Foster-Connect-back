import { expect } from "chai";
import sinon from "sinon";

import { app } from "../app.js";
import { Animal } from "../src/models/Animal.js";
import { Association } from "../src/models/Association.js";

import supertest from "supertest";

import jwt from "jsonwebtoken";
import { dashboardAssociationRoutes } from "../src/routes/dashboardAssociation.routes.js";

/**
 * Pour bypasser le middleware convertAndSaveImage
 * @param {Array} files par défaut on simule que req.files contient une image
 * @param {String} absolutePath par défaut on simule que req.absolutePathImage a un chemin défini
 */
function mockConvertAndSaveImage(files = undefined, absolutePath = undefined) {
    dashboardAssociationRoutes.stack.forEach((layer) => {
        if (layer.route) {
            layer.route.stack.forEach((routeLayer) => {
                if (routeLayer.name === "convertAndSaveImage") {
                    routeLayer.handle = (req, res, next) => {
                        req.files = files;
                        req.absolutePathImage = absolutePath;
                        next();
                    };
                }
            });
        }
    });
}

mockConvertAndSaveImage();

describe("test dashboardAssociation Controller", () => {
    const associationId = 1;
    const associationData = {
        id: associationId,
        name: "une asso",
        role: "association",
        association_id: associationId,
    };

    after(() => {
        sinon.restore();
    });

    const validToken = jwt.sign(associationData, process.env.JWT_SECRET);

    describe("test getAnimals function", async () => {
        const animals = [
            { id: 1, name: "Garfield", species: "Chat", association_id: associationId },
            { id: 2, name: "Snoopy", species: "Chien", association_id: associationId },
            { id: 3, name: "Felix", species: "Chat", association_id: associationId },
            { id: 4, name: "Idefix", species: "Chien", association_id: associationId },
            { id: 5, name: "Milou", species: "Chien", association_id: associationId },
            { id: 6, name: "Scooby-Doo", species: "Chien", association_id: associationId },
            { id: 7, name: "Gipsy", species: "Chat", association_id: associationId },
            { id: 8, name: "Bella", species: "Chien", association_id: associationId },
            { id: 9, name: "Toto", species: "Chien", association_id: associationId },
            { id: 10, name: "Titi", species: "Chien", association_id: associationId },
        ];

        let associationFindByPkStub;
        let animalFindAllStub;
        let animalCountStub;
        beforeEach(() => {
            associationFindByPkStub = sinon.stub(Association, "findByPk");
            animalFindAllStub = sinon.stub(Animal, "findAll");
            animalCountStub = sinon.stub(Animal, "count");
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Devrait retourner les animaux de l'association (condition where)", async () => {
            associationFindByPkStub.resolves(associationData);
            animalFindAllStub.resolves(animals);
            animalCountStub.resolves(10);

            await supertest(app)
                .get("/dashboard/association/animals")
                .set("Authorization", `Bearer ${validToken}`);

            const findAllArgs = animalFindAllStub.getCall(0).args[0];
            expect(findAllArgs).to.have.property("where");
            expect(findAllArgs.where.association_id).to.equal(associationId);
        });

        it("Pagination : devrait retourner 6 animaux maximum", async () => {
            associationFindByPkStub.resolves(associationData);
            animalFindAllStub.resolves(animals);
            animalCountStub.resolves(10);
            const page = 3;
            const limit = 6;

            const response = await supertest(app)
                .get(`/dashboard/association/animals?page=${page}`)
                .set("Authorization", `Bearer ${validToken}`);

            const findAllArgs = animalFindAllStub.getCall(0).args[0];

            expect(findAllArgs).to.have.property("limit").and.to.equal(limit);
            expect(findAllArgs)
                .to.have.property("offset")
                .and.to.equal((page - 1) * limit);
            expect(response.status).to.equal(200);
            expect(response.body.paginatedAnimals).to.be.an("array");
        });

        it("Pagination : si query page non présente dans l'url alors page = 1 (donc offset = 0)", async () => {
            associationFindByPkStub.resolves(associationData);
            animalFindAllStub.resolves(animals);
            animalCountStub.resolves(10);
            const limit = 6;

            const response = await supertest(app)
                .get(`/dashboard/association/animals`)
                .set("Authorization", `Bearer ${validToken}`);

            const findAllArgs = animalFindAllStub.getCall(0).args[0];

            expect(findAllArgs).to.have.property("limit").and.to.equal(limit);
            expect(findAllArgs).to.have.property("offset").and.to.equal(0);
        });

        it("Devrait renvoyer un code 404 et error : Association non trouvée si l'association n'existe pas (recherche avec id)", async () => {
            associationFindByPkStub.resolves(null);

            const response = await supertest(app)
                .get("/dashboard/association/animals")
                .set("Authorization", `Bearer ${validToken}`);

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property("error");
            expect(response.body.error).to.equal("Association non trouvée");
        });

        it("Devrait renvoyer un code 500 en cas d'erreur interne", async () => {
            associationFindByPkStub.rejects(new Error("Erreur interne"));

            const response = await supertest(app)
                .get("/dashboard/association/animals")
                .set("Authorization", `Bearer ${validToken}`);

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property("error").and.to.equal("Erreur interne");
        });
    });

    describe("test storeAnimal function", () => {
        const animal = {
            name: "Garfield",
            species: "Chat",
            age: "3",
            size: "Petit",
            gender: "Mâle",
            description: "toto",
            availability: true,
        };
        const animalId = 1;

        let animalCreateStub;

        beforeEach(async () => {
            animalCreateStub = sinon.stub(Animal, "create");
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Devrait renvoyer l'animal ajouté avec un code 201", async () => {
            mockConvertAndSaveImage([{ animal_img: "fakeImage" }], "/fake/path/to/img");

            const updateStub = sinon
                .stub()
                .resolves({ ...animal, id: animalId, slug: "garfield-1" });

            animalCreateStub.resolves({
                ...animal,
                id: 1,
                update: updateStub,
            });

            const response = await supertest(app)
                .post("/dashboard/association/animals")
                .set("Authorization", `Bearer ${validToken}`)
                .send(animal);

            const updateStubArgs = updateStub.getCall(0).args[0];

            expect(animalCreateStub.calledOnce).to.be.true;
            expect(updateStub.calledOnce).to.be.true;
            expect(updateStubArgs).to.have.property("slug", "garfield-1");

            for (let [key, value] of Object.entries(animal)) {
                expect(response.body).to.have.property(key, value);
            }
            expect(response.body).to.have.property("id", animalId);
            expect(response.body).to.have.property("slug", "garfield-1");
            expect(response.status).to.equal(201);
        });

        it("Devrait renvoyer une ValidationError si une donnée non valide (Joi/Sanitize) avec un code 400", async () => {
            mockConvertAndSaveImage([{ animal_img: "fakeImage" }], undefined);

            const animalCopy = { ...animal };
            delete animalCopy.species;

            const response = await supertest(app)
                .post("/dashboard/association/animals")
                .set("Authorization", `Bearer ${validToken}`)
                .send(animalCopy);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
        });

        it("Devrait renvoyer une ValidationError si pas d'image dans la requête avec un code 400", async () => {
            mockConvertAndSaveImage(undefined, undefined);

            const response = await supertest(app)
                .post("/dashboard/association/animals")
                .set("Authorization", `Bearer ${validToken}`)
                .send(animal);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
        });
    });
});
