import { Association, Animal, Request } from "../models/associations.js";

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

    storeAnimal: async (req, res) => {
        /*
        create and store animal return res.json() new animal
        */

        // Valider les entrées avec Joi

        const animalData = {};

        for (const key in req.body) {
            let value = req.body[key];
            // vérifie si undefined ou champ vide
            if (value === "" || !value) {
                value = null;
                animalData[key] = value;
            } else {
                animalData[key] = value;
            }
        }

        const animal = await Animal.create(animalData);

        res.status(201).json(animal);
    },

    updateAnimal: async (req, res) => {
        /*
        update animal with req.params return res.json updated animal
         */

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

        // Valider avec Joi Validator

        const animalToUpdate = await Animal.findByPk(id);

        if (!animalToUpdate) {
            return next(new Error("Not found"));
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

    destroyAnimal: async (req, res) => {
        /*
        delete animal with req.params return "ok"
         */

        const { id } = req.params;

        const animal = await Animal.findByPk(id);

        if (!animal) {
            return next(new Error("Not Found"));
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
            return next();
        }
        res.json(association);
    },

    updateProfile: async (req, res) => {
        /*
        update association profile return res.json updated profile
         */

        // comme pour le premier get : gestion de l'id provisoire via les query

        const { id } = req.query;

        // Valider avec Joi Validator

        // name, address, zip_code, city, department, phone_number, description, url_image

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

        const associationToUpdate = await As.findByPk(id);

        if (!associationToUpdate) {
            return next(new Error("Not found"));
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

    destroyProfile: async (req, res) => {
        /*
        delete association profile return "ok"
         */
    },

    getRequests: async (req, res, next) => {
        /*
       fetch and return res.json() all requests
        */
        const { id } = req.query;
        const association = await Association.findByPk(id);
        if (!association) {
            return next();
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
    },
};

export { dashboardController };
