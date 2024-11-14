import { Animal, Family, Association, Request, User } from "../models/associations.js";
import { Sequelize } from "sequelize";
import { ValidationError, NotFoundError } from "../utils/customErrors.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { sendEmailAssociationForRequestAnimalDev } from "../utils/sendEmail/SendEmailAssociationForRequestAnimalDev.js";

const requestsController = {

    // Pour les familles

    // Créer une demande 

    createRequestFamily: async (req, res, next) => {
        const { family_id } = req.user;
        const { association_id, animal_id } = req.body;

        // Validation des entrées et vérification si la famille et l'association existent
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

        // Création de la demande

        const status = "En attente";

        const request = await Request.create({ status, family_id, animal_id, association_id });

        // Récupérer email association

        // Recherche de l'association dans la base de données pour récupérer l'email

         const association = await Association.findByPk(association_id);  // Assurez-vous que l'Association a un champ email
              if (!association) {
                  return next(new NotFoundError('Association introuvable'));
              }

        const emailAssociation =  association.email_association;

        // Avoir le nom de de la famille demandant l'hébergement

        const familyName = family.name; 

        // Avoir le nom de l'animal objet de l'hébergement

        const animalName = animal.name;

        // Pour obtenir l'image de l'animal 

        const imageAnimal = animal.url_image;

        // Pour obtenir l'espèces de l'animal

        const species = animal.species.toLowerCase();

        // Objet 

        const emailContent =  {
            familyName,        // Nom de la famille
            animalName,        // Nom de l'animal       
            imageAnimal,       // Image de l'animal
            species,
        };

        // Envoi de l'email à l'association pour l'informer de la demande

        await sendEmailAssociationForRequestAnimalDev(emailAssociation, emailContent);

        // Réponse avec la demande créée et statut 201 (création réussie)

        res.status(201).json(request);
    },

    
    // Avoir la liste des demandes

    getRequestsFamily: async (req, res, next) => {

            // Extraire familyId et userId depuis le token décodé

            const { family_id: familyId } = req.user;
    
            // Recherche de la famille par son ID
            const family = await Family.findByPk(familyId);
            if (!family) {
                return next(new NotFoundError('Famille non trouvée'));  // Retourner une erreur si la famille n'est pas trouvée
            }
    
            // Recherche des demandes associées à cette famille

            const requestsFamily = await Request.findAll({
                where: { family_id: familyId },
                include: [
                    { model: Animal, as: "animal" }, 
                    { model: Association, as: "association", include: [{ model: User, as: "user" }] }, // Inclure User dans Association
                    { model: Family, as: "family", include: [{ model: User, as: "user" }] },  // Inclure User dans Family
                ],
                order: [["created_at", "ASC"]], // Tri par created_at
            });
    
            // Retourner les demandes et l'email de l'utilisateur
            res.json({ requestsFamily });

        },

            // Supprimer une demande 

    destroyRequestFamily: async (req, res, next) => {
        const { id: requestId } = req.params;

        const requestFamilyToDestroy = await Request.findByPk(requestId);

        if (!requestFamilyToDestroy) {
            return next(new NotFoundError());
        }

        await requestFamilyToDestroy.destroy();

        res.status(204).send(); // Pas de contenu à renvoyer après suppression
    },

    // Pour les associations

    // Avoir la liste des demandes d'une famille 

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
                { model: Association, as: "association", include: [{ model: User, as: "user" }] }, // Inclure User dans Association
                { model: Family, as: "family", include: [{ model: User, as: "user" }] },  // Inclure User dans Family
            ],
             order: [
        ["animal_id", "ASC"], // Tri initial par animal_id
        ["created_at", "ASC"], // Tri par created_at
         ],
        });

        res.json(requestsAssociations);
    },

    // Modifier le statut d'une demande par l'association

    updateRequestAssociation: async (req, res, next) => {
        const { association_id: associationId } = req.user;
        const { id: requestId } = req.params;

        // JOI validation
        
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
