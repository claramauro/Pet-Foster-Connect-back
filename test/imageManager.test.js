import { expect } from "chai";
import sinon from "sinon";

import fs from "node:fs/promises";

import {
    removeImage,
    getAbsolutePathOfImage,
    getRelativePathOfImage,
} from "../src/utils/imageManager.js";

describe("test imageManager functions", () => {
    describe("removeImage function", () => {
        it("Devrait supprimer le fichier si chemin valide", async () => {
            const unlinkStub = sinon.stub(fs, "unlink").resolves();

            const path = "public/images/animals/test.webp";
            await removeImage(path);

            const unlinkArgs = unlinkStub.getCall(0).args[0];

            expect(unlinkStub.calledOnce).to.be.true; // Vérifie que unlink a été appelé avec le bon chemin
            expect(unlinkArgs).to.equal(path);

            unlinkStub.restore();
        });

        it("Devrait lancer une erreur si chemin non valide/fichier introuvable", async () => {
            const unlinkStub = sinon.stub(fs, "unlink").rejects(new Error("File not found"));

            const path = "public/images/animals/test.webp";

            try {
                await removeImage(path);
                expect.fail("Erreur non lancée");
            } catch (error) {
                expect(error).to.be.instanceof(Error);
                expect(error.message).to.equal("File not found");
            } finally {
                unlinkStub.restore();
            }
        });
    });

    describe("test getAbsolutePathOfImage function", () => {
        it("devrait retourner le chemin absolu valide", () => {
            const relativePath = "/images/animals/test.webp";
            const absolutePath = getAbsolutePathOfImage(relativePath);

            const expectedPath = "/src/public/images/animals/test.webp";

            expect(absolutePath).to.equal(expectedPath);
        });
    });

    describe("test getRelativePathOfImage function", () => {
        it("devrait retourner le chemin relatif valide", () => {
            const absolutePath = "/src/public/images/animals/test.webp";
            const relativePath = getRelativePathOfImage(absolutePath);

            const expectedPath = "/images/animals/test.webp";

            expect(relativePath).to.equal(expectedPath);
        });
    });
});
