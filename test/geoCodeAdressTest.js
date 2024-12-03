import { expect } from "chai";
import nock from "nock";
import { geocodeAddress } from "../src/utils/geocodeAdress.js";
import { ValidationError } from "../src/utils/customErrors.js";

describe("test function geocodeAddress", function () {
    // Exemple d'adresse
    const address = "60 Avenue des Champs-Elysées";
    const city = "Paris";
    const zipcode = "75008";

    afterEach(() => {
        // Après chaque test, nettoyer les nocks pour éviter les interférences
        nock.cleanAll();
    });

    it("should return correct latitude and longitude for a valid address", async function () {
        const mockedResponse = [
            {
                lat: "48.8706225",
                lon: "2.3060702",
            },
        ];

        nock("https://nominatim.openstreetmap.org")
            .matchHeader("User-Agent", "PetFosterConnect/1.0 (noreplypetfosterconnect@gmail.com)")
            .get("/search")
            .query({
                format: "json",
                q: `${address}, ${zipcode}, ${city}`,
                addressdetails: "1",
                limit: "1",
            })
            .reply(200, mockedResponse);

        const result = await geocodeAddress(address, zipcode, city);

        // Arrondir les valeurs à 7 décimales pour les comparer
        const roundedLatitude = result.latitude;
        const roundedLongitude = result.longitude;

        expect(nock.isDone()).to.be.true;
        expect(roundedLatitude).to.equal(parseFloat(mockedResponse[0].lat));
        expect(roundedLongitude).to.equal(parseFloat(mockedResponse[0].lon));
    });

    it("should throw a ValidationError if no result is found for the address", async function () {
        nock("https://nominatim.openstreetmap.org")
            .get("/search")
            .query({
                format: "json",
                q: `${address}, ${zipcode}, ${city}`,
                addressdetails: "1",
                limit: "1",
            })
            .reply(200, []);

        try {
            await geocodeAddress(address, zipcode, city);
            expect.fail("Expected error not thrown");
        } catch (error) {
            expect(error.message).to.equal("Aucun résultat trouvé pour cette adresse.");
            expect(error).to.be.an.instanceof(ValidationError);
        }
    });

    it("should handle API errors gracefully", async function () {
        nock("https://nominatim.openstreetmap.org")
            .get("/search")
            .query({
                format: "json",
                q: `${address}, ${zipcode}, ${city}`,
                addressdetails: "1",
                limit: "1",
            })
            .replyWithError("Request failed");

        try {
            await geocodeAddress(address, zipcode, city);
            expect.fail("Expected error not thrown");
        } catch (error) {
            expect(error.message).to.include("Request failed");
            expect(error instanceof Error).to.be.true;
        }
    });
});
