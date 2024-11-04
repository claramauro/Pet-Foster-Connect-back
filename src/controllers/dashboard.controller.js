import { Association, Animal, Request, sequelize } from "../models/associations.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { ValidationError, NotFoundError } from "../utils/customErrors.js";
import { removeImage } from "../utils/imageManager.js";
import path from "node:path";

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
        if (!req.files) {
            return next(new ValidationError("animal_img", "Le champ image est obligatoire."));
        }

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

        const relativePathImage = req.absolutePathImage.replace("/src/public", "");
        animalData.url_image = relativePathImage;
        const animal = await Animal.create(animalData);

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

        // Dans le cas où une nouvelle image est téléchargée
        // On récupère le chemin absolu de l'ancienne image
        // Pour pouvoir la supprimer après la mise à jour de la bdd
        const oldImageAbsolutePath = path.join(
            import.meta.dirname,
            "../../public",
            animalToUpdate.url_image
        );

        let relativePathNewImage;
        let isImageChange = false;
        if (req.files) {
            // Si une nouvelle image est téléchargée on récupère son chemin
            // Pour pouvoir mettre à jour l'url dans la bdd
            relativePathNewImage = req.absolutePathImage.replace("/src/public", "");
            isImageChange = true;
        }

        const updatedAnimal = await animalToUpdate.update({
            name: animalData.name || animalToUpdate.name,
            gender: animalData.gender || animalToUpdate.gender,
            race: animalData.race || animalToUpdate.race,
            species: animalData.species || animalToUpdate.species,
            age: animalData.age || animalToUpdate.age,
            size: animalData.size || animalToUpdate.size,
            description: animalData.description || animalToUpdate.description,
            url_image: isImageChange ? relativePathNewImage : animalToUpdate.url_image,
            availability: animalData.availability || animalToUpdate.availability,
            family_id: animalData.family_id || animalToUpdate.family_id,
            association_id: animalData.association_id || animalToUpdate.association_id,
        });

        if (isImageChange) {
            // Une fois l'animal mis à jour en BDD on supprime l'ancienne image
            await removeImage(oldImageAbsolutePath);
        }

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
        const imagePath = path.join(import.meta.dirname, "../../public", animal.url_image);
        await animal.destroy();
        await removeImage(imagePath);
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

        // Dans le cas où une nouvelle image est téléchargée
        // On récupère le chemin absolu de l'ancienne image
        // Pour pouvoir la supprimer après la mise à jour de la bdd
        const oldImageAbsolutePath = path.join(
            import.meta.dirname,
            "../../public",
            associationToUpdate.url_image
        );

        let relativePathNewImage;
        let isImageChange = false;
        if (req.files) {
            // Si une nouvelle image est téléchargée on récupère son chemin
            // Pour pouvoir mettre à jour l'url dans la bdd
            relativePathNewImage = req.absolutePathImage.replace("/src/public", "");
            isImageChange = true;
        }

        const updatedAssociation = await associationToUpdate.update({
            name: associationData.name || associationToUpdate.name,
            address: associationData.gender || associationToUpdate.address,
            zip_code: associationData.race || associationToUpdate.zip_code,
            city: associationData.city || associationToUpdate.city,
            department: associationData.department || associationToUpdate.department,
            phone_number: associationData.phone_number || associationToUpdate.phone_number,
            description: associationData.description || associationToUpdate.description,
            url_image: isImageChange ? relativePathNewImage : associationToUpdate.url_image,
        });

        if (isImageChange) {
            // Une fois l'association mise à jour en BDD on supprime l'ancienne image
            await removeImage(oldImageAbsolutePath);
        }

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
