import { Association, Animal, Request } from "../models/associations.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import path from "node:path";
import fs from "node:fs";
import { ValidationError, NotFoundError } from "../utils/customErrors.js";

const dashboardController = {
    getAnimals: async (req, res, next) => {
        /*
       fetch and return res.json() all animals
        */
        // Pour l'instant on récupère l'id de l'association avec query
        // Plus tard avec le système d'authentification/JWT
        const { id } = req.query;
        const association = await Association.findByPk(id);
        if (!association) {
            return next();
        }
        const animals = await Animal.findAll({
            where: {
                association_id: id,
            },
        });
        res.json(animals);
    },

    storeAnimal: async (req, res, next) => {
        /*
        create and store animal return res.json() new animal
        */

        // Valider les entrées avec Joi
        const { error, value } = validateAndSanitize.animalStore.validate(req.body);
        if (error) {
            return next(new ValidationError());
        }

        const animalData = {};

        for (const key in req.body) {
            let value = req.body[key];
            // vérifie si undefined ou champ vide
            if (value === "" || (!value && key !== "availability")) {
                value = null;
                animalData[key] = value;
            } else {
                animalData[key] = value;
            }
        }

        const animal = await Animal.create(animalData);

        // Gestion de l'image téléchargée
        const newNameImage = `${animal.name}-${animal.id}.webp`;
        const newImagePath = path.join(req.imagePath, "../", `${newNameImage}`);
        fs.renameSync(req.imagePath, newImagePath);
        req.imagePath = newImagePath;
        //Ajouter l'url de l'image renommée en bdd
        animal.update({ url_image: `/images/animals/${newNameImage}` });
        res.status(201).json(animal);
    },

    updateAnimal: async (req, res, next) => {
        /*
        update animal with req.params return res.json updated animal
         */

        // Validation des données

        const { error, value } = validateAndSanitize.animalUpdate.validate(req.body);
        if (error) {
            return next(new ValidationError());
        }

        const { id } = req.params;

        const animalData = {};

        for (const key in req.body) {
            let value = req.body[key];
            // vérifie si undefined ou champ vide
            if (value === "" || !value) {
                value = null;
            } else {
                animalData[key] = value;
            }
        }

        const animalToUpdate = await Animal.findByPk(id);

        if (!animalToUpdate) {
            return next(new NotFoundError());
        }

        const updatedAnimal = await animalToUpdate.update({
            name: animalData.name || animalToUpdate.name,
            gender: animalData.gender || animalToUpdate.gender,
            race: animalData.race || animalToUpdate.race,
            species: animalData.species || animalToUpdate.species,
            age: animalData.age || animalToUpdate.age,
            size: animalData.size || animalToUpdate.size,
            description: animalData.description || animalToUpdate.description,
            url_img: animalData.url_img || animalToUpdate.url_img,
            availability: animalData.availability || animalToUpdate.availability,
            family_id: animalData.family_id || animalToUpdate.family_id,
            association_id: animalData.association_id || animalToUpdate.association_id,
        });

        res.json(updatedAnimal);
    },

    destroyAnimal: async (req, res, next) => {
        /*
        delete animal with req.params return "ok"
         */

        const { id } = req.params;

        const animal = await Animal.findByPk(id);

        if (!animal) {
            return next(new NotFoundError());
        }

        await animal.destroy();

        return res.sendStatus(204);
    },

    getProfile: async (req, res, next) => {
        /*
       fetch and return res.json() association profile
        */
        const { id } = req.query;
        const association = await Association.findByPk(id);
        if (!association) {
            return next(new NotFoundError());
        }
        res.json(association);
    },

    updateProfile: async (req, res, next) => {
        /*
        update association profile return res.json updated profile
         */

        // comme pour le premier get : gestion de l'id provisoire via les query

        const { id } = req.query;

        // Valider avec Joi Validator

        const { error, value } = validateAndSanitize.familyOrAssociationUpdate.validate(req.body);
        if (error) {
            return next(new ValidationError());
        }

        const associationData = {};

        for (const key in req.body) {
            let value = req.body[key];
            // vérifie si undefined ou champ vide
            if (value === "" || !value) {
                value = null;
            } else {
                associationData[key] = value;
            }
        }

        const associationToUpdate = await Association.findByPk(id);

        if (!associationToUpdate) {
            return next(new NotFoundError());
        }

        const updatedAssociation = await associationToUpdate.update({
            name: associationData.name || associationToUpdate.name,
            address: associationData.gender || associationToUpdate.address,
            zip_code: associationData.race || associationToUpdate.zip_code,
            city: associationData.city || associationToUpdate.city,
            department: associationData.department || associationToUpdate.department,
            phone_number: associationData.phone_number || associationToUpdate.phone_number,
            description: associationData.description || associationToUpdate.description,
            url_img: associationData.url_img || associationToUpdate.url_img,
        });

        res.json(updatedAssociation);
    },

    destroyProfile: async (req, res, next) => {
        /*
        delete association profile return "ok"
         */

        const { id } = req.params;

        const association = await Association.findByPk(id);

        if (!association) {
            return next(new NotFoundError());
        }

        await association.destroy();
        // TODO : Déconnecter l'association

        return res.sendStatus(204);
    },

    getRequests: async (req, res, next) => {
        /*
       fetch and return res.json() all requests
        */
        const { id } = req.query;
        const association = await Association.findByPk(id);
        if (!association) {
            return next(new NotFoundError());
        }
        const requests = await Request.findAll({
            where: {
                association_id: id,
            },
            include: ["family", "animal"],
        });
        res.json(requests);
    },

    updateRequest: async (req, res) => {
        /*
        update request with req.params return res.json updated request
         */
        const { id } = req.params;

        // JOI validation

        const { error, value } = validateAndSanitize.updatedRequest.validate(req.body);
        if (error) {
            return next(new ValidationError());
        }

        const request = await Request.findByPk(id);
        if (!request) {
            return next(new NotFoundError());
        }
        const newStatus = req.body.status;
        const updatedRequest = await request.update({ status: newStatus });
        res.json(updatedRequest);
    },
};

export { dashboardController };
