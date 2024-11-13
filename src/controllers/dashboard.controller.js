import { Association, Animal, Request, sequelize, User, Family } from "../models/associations.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { ValidationError, NotFoundError, AuthorizationError, AuthentificationError } from "../utils/customErrors.js";
import {
    removeImage,
    getAbsolutePathOfImage,
    getRelativePathOfImage,
} from "../utils/imageManager.js";
import { generateSlug } from "../utils/generateSlug.js";
import bcrypt from "bcrypt";

const dashboardController = {
    getAnimals: async (req, res, next) => {
        const { association_id: associationId } = req.user;
        const association = await Association.findByPk(associationId);
        if (!association) {
            return next();
        }
        const animals = await Animal.findAll({
            where: {
                association_id: associationId,
            },
        });
        res.json(animals);
    },

    storeAnimal: async (req, res, next) => {
        const { association_id: associationId } = req.user;
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new ValidationError("animal_img", "Le champ image est obligatoire."));
        }
        // Valider les entrées avec Joi
        const { error } = validateAndSanitize.animalStore.validate(req.body);
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
        animalData["association_id"] = associationId;
        const relativePathImage = getRelativePathOfImage(req.absolutePathImage);
        animalData.url_image = relativePathImage;

        const transaction = await sequelize.transaction();

        let animal;

        try {
            animal = await Animal.create(animalData);
            const slug = generateSlug(animal.name, animal.id);
            await animal.update({
                    slug: slug,
                },
                { transaction },
            );
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
        res.status(201).json(animal);
    },

    updateAnimal: async (req, res, next) => {
        const { association_id: associationId } = req.user;
        // Validation des données
        const { error } = validateAndSanitize.animalUpdate.validate(req.body);
        if (error) {
            return next(new ValidationError());
        }
        const { id: animalId } = req.params;
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
        const animalToUpdate = await Animal.findByPk(animalId);
        if (!animalToUpdate) {
            return next(new NotFoundError());
        }
        if (animalToUpdate.association_id !== associationId) {
            return next(
                new AuthorizationError(
                    "Cet animal ne fait pas partie de votre association. Modification non autorisée.",
                ),
            );
        }
        // Dans le cas où une nouvelle image est téléchargée
        // On récupère le chemin absolu de l'ancienne image
        // Pour pouvoir la supprimer après la mise à jour de la bdd
        const oldImageAbsolutePath = getAbsolutePathOfImage(animalToUpdate.url_image);
        let relativePathNewImage;
        let isImageChange = false;
        if (Object.keys(req.files).length !== 0) {
            // Si une nouvelle image est téléchargée on récupère son chemin
            // Pour pouvoir mettre à jour l'url dans la bdd
            relativePathNewImage = getRelativePathOfImage(req.absolutePathImage);
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
        });
        // Une fois la bdd mise à jour on passe req.absolutePathImage à null (qui contient le chemin de la nouvelle image)
        // Car si != de null sera supprimé par le errorHandler en cas d'erreur
        // A ce stade, le chemin de la nouvelle l'image est enregistré dans la BDD donc on ne veut pas supprimer cette nouvelle image si erreur
        req.absolutePathImage = null;
        if (isImageChange) {
            // Une fois l'animal mis à jour en BDD on supprime l'ancienne image
            await removeImage(oldImageAbsolutePath);
        }
        res.json(updatedAnimal);
    },

    destroyAnimal: async (req, res, next) => {
        const { association_id: associationId } = req.user;
        const { id: animalId } = req.params;
        const animal = await Animal.findByPk(animalId);
        if (!animal) {
            return next(new NotFoundError());
        }
        if (animal.association_id !== associationId) {
            return next(
                new AuthorizationError(
                    "Cet animal ne fait pas partie de votre association. Suppression non autorisée.",
                ),
            );
        }
        const imageAbsolutePath = getAbsolutePathOfImage(animal.url_image);
        await animal.destroy();
        await removeImage(imageAbsolutePath);
        return res.sendStatus(204);
    },

    getProfile: async (req, res, next) => {
        const { association_id: associationId } = req.user;
        const association = await Association.findByPk(associationId);
        if (!association) {
            return next(new NotFoundError());
        }
        res.json(association);
    },

    updateProfile: async (req, res, next) => {
        const transaction = await sequelize.transaction();

        try {
            const { association_id: associationId, id: userId } = req.user;

            // Valider avec Joi Validator
            const { error } = validateAndSanitize.familyOrAssociationUpdate.validate(req.body);
            if (error) {
                await transaction.rollback();
                return next(new ValidationError());
            }

            const associationData = {};
            for (const key in req.body) {
                let value = req.body[key];
                if (value === "" || !value) {
                    value = null;
                } else {
                    associationData[key] = value;
                }
            }

            let hashedPassword;
            if (associationData.password) {
                if (associationData.password !== associationData.confirmPassword) {
                    await transaction.rollback();
                    return next(new AuthentificationError("Les mots de passe ne correspondent pas."));
                }
                hashedPassword = await bcrypt.hash(associationData.password, 10);
            }

            const associationToUpdate = await Association.findByPk(associationId, { transaction });
            if (!associationToUpdate) {
                await transaction.rollback();
                return next(new NotFoundError());
            }

            const oldImageAbsolutePath = getAbsolutePathOfImage(associationToUpdate.url_image);
            let relativePathNewImage;
            let isImageChange = false;
            if (Object.keys(req.files).length !== 0) {
                relativePathNewImage = getRelativePathOfImage(req.absolutePathImage);
                isImageChange = true;
            }

            let updatedAssociation = await associationToUpdate.update(
                {
                    name: associationData.name || associationToUpdate.name,
                    address: associationData.gender || associationToUpdate.address,
                    zip_code: associationData.race || associationToUpdate.zip_code,
                    city: associationData.city || associationToUpdate.city,
                    department_id: associationData.department || associationToUpdate.department_id,
                    phone_number: associationData.phone_number || associationToUpdate.phone_number,
                    description: associationData.description || associationToUpdate.description,
                    url_image: isImageChange ? relativePathNewImage : associationToUpdate.url_image,
                },
                { transaction },
            );

            req.absolutePathImage = null;
            if (isImageChange) {
                await removeImage(oldImageAbsolutePath);
            }

            const userToUpdate = await User.findByPk(userId, { transaction });
            if (!userToUpdate) {
                await transaction.rollback();
                return next(new NotFoundError());
            }

            await userToUpdate.update(
                {
                    email: associationData.email,
                    password: hashedPassword,
                },
                { transaction },
            );

            updatedAssociation = await updatedAssociation.reload({
                include: "department",
                transaction,
            });

            await transaction.commit();

            res.json(updatedAssociation);

        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    },

    destroyProfile: async (req, res, next) => {
        const { association_id: associationId, id: userId } = req.user;
        const association = await Association.findByPk(associationId);
        if (!association) {
            return next(new NotFoundError());
        }
        const imageAbsolutePath = getAbsolutePathOfImage(association.url_image);
        await removeImage(imageAbsolutePath);

        const userToDestroy = await Family.findByPk(userId);
        if (!userToDestroy) {
            return next(new NotFoundError());
        }

        await userToDestroy.destroy();

        return res.sendStatus(204);
    },

    getRequests: async (req, res, next) => {
        const { association_id: associationId } = req.user;
        const association = await Association.findByPk(associationId);
        if (!association) {
            return next(new NotFoundError());
        }
        const requests = await Request.findAll({
            where: {
                association_id: associationId,
            },
            include: ["family", "animal"],
        });
        res.json(requests);
    },

    updateRequest: async (req, res, next) => {
        const { association_id: associationId } = req.user;
        const { id: requestId } = req.params;
        // JOI validation
        const { error } = validateAndSanitize.updateRequest.validate(req.body);
        if (error) {
            return next(new ValidationError());
        }

        const request = await Request.findOne(requestId, {
            where: {
                association_id: associationId,
            },
        });
        if (!request) {
            return next(new NotFoundError());
        }
        const newStatus = req.body.status;
        const updatedRequest = await request.update({ status: newStatus });
        res.json(updatedRequest);
    },
};

export { dashboardController };