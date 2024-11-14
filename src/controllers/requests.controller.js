import { Animal, Family, Association, Request, User } from "../models/associations.js";
import { ValidationError, NotFoundError } from "../utils/customErrors.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { sendEmailAssociationForRequestAnimal } from "../utils/sendEmail/SendEmailAssociationForRequestAnimal.js";

const requestsController = {
    // Pour les familles
    createRequestFamily: async (req, res, next) => {
        const { family_id } = req.user;
        const { association_id, animal_id } = req.body;

        const { error } = validateAndSanitize.createAnimalRequest.validate(req.body);
        if (error) {
            return next(new ValidationError());
        }

        const family = await Family.findByPk(family_id);
        const animal = await Animal.findOne({
            where: {
                id: animal_id,
                association_id: association_id,
            },
        });

        if (!family || !animal) {
            return next(new NotFoundError());
        }

        const status = "En attente";

        const request = await Request.create({ status, family_id, animal_id, association_id });

        // Récupérer email association
        const association = await Association.findByPk(association_id);
        if (!association) {
            return next(new NotFoundError("Association introuvable"));
        }

        const emailAssociation = association.email_association;

        const emailContent = {
            familyName: family.name,
            animalName: animal.name,
            imageAnimal: animal.url_image,
            species: animal.species.toLowerCase(),
        };

        // Envoi de l'email à l'association pour l'informer de la demande
        await sendEmailAssociationForRequestAnimal(emailAssociation, emailContent);

        res.status(201).json(request);
    },

    getRequestsFamily: async (req, res, next) => {
        const { family_id: familyId } = req.user;

        const family = await Family.findByPk(familyId);
        if (!family) {
            return next(new NotFoundError("Famille non trouvée"));
        }

        const requestsFamily = await Request.findAll({
            where: { family_id: familyId },
            include: [
                { model: Animal, as: "animal" },
                { model: Association, as: "association" },
            ],
            order: [["created_at", "ASC"]],
        });
        res.json(requestsFamily);
    },

    destroyRequestFamily: async (req, res, next) => {
        const { id: requestId } = req.params;

        const requestFamilyToDestroy = await Request.findByPk(requestId);

        if (!requestFamilyToDestroy) {
            return next(new NotFoundError());
        }

        await requestFamilyToDestroy.destroy();

        res.status(204).send();
    },

    // Pour les associations
    getRequestsAssociations: async (req, res, next) => {
        const { association_id: associationId } = req.user;
        const association = await Association.findByPk(associationId);

        if (!association) {
            return next(new NotFoundError());
        }

        const requestsAssociations = await Request.findAll({
            where: { association_id: associationId },
            include: [
                { model: Animal, as: "animal" },
                {
                    model: Family,
                    as: "family",
                    include: [{ model: User, as: "user", attributes: ["email"] }],
                },
            ],
            order: [
                ["animal_id", "ASC"],
                ["created_at", "ASC"],
            ],
        });

        res.json(requestsAssociations);
    },

    updateRequestAssociation: async (req, res, next) => {
        const { association_id: associationId } = req.user;
        const { id: requestId } = req.params;

        const { error } = validateAndSanitize.updateRequestAssociation.validate(req.body);
        if (error) {
            return next(new ValidationError());
        }

        const request = await Request.findOne({
            where: { id: requestId, association_id: associationId },
        });

        if (!request) {
            return next(new NotFoundError());
        }

        const newStatus = req.body.status;
        const updatedRequestAssociation = await request.update({ status: newStatus });

        res.json(updatedRequestAssociation);
    },
};

export { requestsController };
