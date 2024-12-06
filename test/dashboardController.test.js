import { expect } from "chai";
import sinon from "sinon";

import { app } from "../app.js";
import { Animal } from "../src/models/Animal.js";
import { Association } from "../src/models/Association.js";
import { NotFoundError } from "../src/utils/customErrors.js";

import supertest from "supertest";

import jwt from "jsonwebtoken";
import { validateAndSanitize } from "../src/utils/validateAndSanitize.js";
import { convertAndSaveImage } from "../src/middlewares/imageHandler.js";

describe("test dashboardAssociation Controller", () => {
    const associationId = 1;
    const associationData = {
        id: associationId,
        name: "une asso",
        role: "association",
        association_id: associationId,
    };

    before(() => {
        // Remplacer temporairement le middleware pour les tests
        app.use((req, res, next) => {
            req.user = associationData;
            next();
        });
    });

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
        let validateStub;
        let animalCreateStub;
        let animalUpdateStub;

        let middlewareImageStub;

        const obj = {
            convertAndSaveImage: convertAndSaveImage,
        };
        beforeEach(async () => {
            // Stub de la fonction convertAndSaveImage
            middlewareImageStub = sinon
                .stub(obj, "convertAndSaveImage")
                .callsFake((req, res, next) => {
                    req.files = { animal_img: [{ buffer: Buffer.from("mockImage") }] };
                    req.absolutePathImage = "/mock/image/path.webp"; // Simulez le chemin d'accès
                    next(); // Passez au middleware suivant
                });

            validateStub = sinon.stub(validateAndSanitize.animalStore, "validate");
            animalCreateStub = sinon.stub(Animal, "create");
            animalUpdateStub = sinon.stub(Animal, "update");
        });

        afterEach(() => {
            sinon.restore();
        });

        const animal = { id: 1, name: "Garfield", species: "Chat", animal_img: "test" };

        it("Retourne une ValidationError si une donnée non valide (Joi/Sanitize)", async () => {
            validateStub.resolves();
            animalCreateStub.resolves();
            animalUpdateStub.resolves();

            const response = await supertest(app)
                .post("/dashboard/association/animals")
                .set("Authorization", `Bearer ${validToken}`);

            console.log(response.body);
        });
    });
});
