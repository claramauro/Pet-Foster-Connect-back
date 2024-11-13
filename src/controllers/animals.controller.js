import { Animal, Request, Family, Association } from "../models/associations.js";
import { Sequelize } from "sequelize";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { ValidationError, NotFoundError } from "../utils/customErrors.js";
import { sendEmailAssociationForRequestAnimalDev } from "../utils/sendEmail/SendEmailAssociationForRequestAnimalDev.js";

const animalsController = {
    index: async (req, res) => {
        /* Query pour la page d'accueil et pour récupérer le nombres total d'animaux */
        const animals = await Animal.findAll({
            include: [
                { association: "association", include: "department" },
                { association: "family" },
            ],
        });

        /* Query pour l'affichage des animaux en fonction de la page */
        const currentPage = req.query.page || 1;
        const limit = 6; // Nombre d'animaux max
        const offset = (Number(currentPage) - 1) * 6; // Offset de 6 - 12 - 18... en fonction de la page courante

        const paginationAnimals = await Animal.findAll({
            include: [
                { association: "association", include: "department" },
                { association: "family" },
            ],
            limit: limit,
            offset: offset,
        });

        res.json({
            allAnimals: animals,
            paginatedAnimals: paginationAnimals,
        });
    },

    findOne: async (req, res, next) => {
        /*
        fetch with req.params and return res.json() one association
         */
        const { id } = req.params;
        const animal = await Animal.findByPk(id, {
            include: [
                { association: "association", include: "department" },
                { association: "family" },
            ],
        });

        if (!animal) {
            return next(new NotFoundError());
        }

        res.json(animal);
    },

    createRequest: async (req, res, next) => {
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

    filter: async (req, res, next) => {
        /*
        fetch, filter with req.query and return res.json() all corresponding animals
         */

        // Middleware de gestion des queries pour vérifier si undefined ou non + transformer age récupéré en intervale (inférieur ou égal) - Ce middleware vient construire la requ$ete where qu'on va passer à sequelize

        const buildWhereClause = (query) => {
            // On vient valider et sanitizer les entrées de la query

            const { error, value } = validateAndSanitize.animalSearchFilter.validate(query);
            if (error) {
                return next(error);
            }

            const animalWhere = {};
            const associationWhereClause = {};

            if (query.species) animalWhere.species = query.species;

            // le front renvoie un intervale sous forme de string (ex: "0-2") sauf 11 = supérieur à 11
            if (query.age) {
                if (query.age === "11") {
                    animalWhere.age = { [Sequelize.Op.gte]: Number.parseInt(11) };
                } else {
                    const splitAges = query.age.split("-");
                    const [age1, age2] = splitAges;
                    animalWhere.age = {
                        [Sequelize.Op.gte]: Number.parseInt(age1),
                        [Sequelize.Op.lte]: Number.parseInt(age2),
                    };
                }
            }
            if (query.size) animalWhere.size = query.size;
            if (query.gender) animalWhere.gender = query.gender;
            if (query.association_id) animalWhere.association_id = query.association_id;

            // Gestion association et animalWhere pour chercher la localisation via l'association
            if (query.department_id) associationWhereClause.department_id = query.department_id;
            if (query.association) associationWhereClause.id = query.association; //

            return { animalWhere: animalWhere, associationWhere: associationWhereClause };
        };

        // On appelle buildWhereClause pour récupérer animalWhere et associationWhere
        const { animalWhere, associationWhere } = buildWhereClause(req.query);

        const currentPage = req.query.page || 1;
        const limit = 6; // Nombre d'animaux max
        const offset = (Number(currentPage) - 1) * 6; // Offset de 6 - 12 - 18... en fonction de la page courante

        // On récupère tous les animaux filtrés par rapport à la requête
        const filterAnimals = await Animal.findAll({
            where: animalWhere,
            include: [
                {
                    model: Association,
                    as: "association",
                    where: associationWhere,
                    include: "department",
                },
            ],
        });
        // On pagine le résultat des animaux par rapport à la limite (nb d'animaux) et l'offset (correspondant au numéro de page demandé)
        const paginatedAnimals = filterAnimals.slice(offset, offset + limit);
        // On renvoie le nombre total d'animaux retourné par la requête filtrée et les animaux paginés
        res.json({
            totalAnimalCount: filterAnimals.length,
            paginatedAnimals: paginatedAnimals,
        });
    },

        // Mettre à jour le statut de l'animal : Indisponbile à disponible

        update: async (req, res, next) => {
        
                // Récupérer l'id de l'animal à partir des paramètres de la requête

                const { animal_id } = req.params;
        
                // Chercher l'animal par son ID

                const animal = await Animal.findByPk(animal_id);
        
                // Si l'animal n'existe pas

                if (!animal) {
                    return next(new NotFoundError('Animal introuvable'));
                }
        
                // Vérifier que l'animal est "Indisponible" et relié à une famille
                
                if (animal.status !== "Indisponible" || !animal.family_id) 
                {
                    return next(new ValidationError("L'animal doit être 'Indisponible' et avoir une famille associée"));
                }
        
                // Mise à jour du statut de l'animal : "Indisponible" à "Disponible" et suppression de la famille associée

                await Animal.update(
                    {
                        status: "Disponible", // Mettre à jour le statut de l'animal à "Disponible"
                        family_id: null,      // Supprimer la famille associée
                    },
                    {
                        where: { id: animal_id }, // Spécifier l'animal à mettre à jour par son ID
                    }
                );
        
                // Récupérer l'animal mis à jour (pour retourner les nouvelles valeurs)
                const updatedAnimal = await Animal.findByPk(animal_id);
        
                // Retourner une réponse avec l'animal mis à jour
                res.status(200).json({
                    message: "Statut de l'animal mis à jour avec succès.",
                    animal: updatedAnimal,
                });
            }
        }

export { animalsController };