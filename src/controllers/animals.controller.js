import { Animal, Request, Family, Association } from "../models/associations.js";
import { Sequelize } from "sequelize";
import { validateAndSanitize } from "../middlewares/validateAndSanitize.js";
// import Joi from 'joi';

const animalsController = {
    index: async (req, res) => {
        /*
       fetch and return  res.json() all animals
        */
        const animals = await Animal.findAll({
            include: [{ association: "association" }, { association: "family" }],
        });

        res.json(animals);
    },
    findOne: async (req, res) => {
        /*
        fetch with req.params and return res.json() one association
         */
        const { id } = req.params;
        const animal = await Animal.findByPk(id, {
            include: [{ association: "association" }, { association: "family" }],
        });

        if (!animal) {
            return next(new Error("Not Found"));
        }

        res.json(animal);
    },

    createRequest: async (req, res) => {
        /*
        create request with association_id (user_id) family_id (user_id) and animal_id return res.json() request
         */
        const { family_id, animal_id } = req.body;

        // Validation des entrées et vérification si la famille et l'association existent

        const { error, value } = validateAndSanitize.createAnimalRequest.validate(req.body);

        if (error) {
            return next(error);
        }

        const family = await Family.findByPk(family_id);
        const animal = await Animal.findByPk(animal_id);

        if (!family || !animal) {
            return next(Error);
        }

        // Création de la demande

        const status = "En attente";

        const request = await Request.create({ status, family_id, animal_id });
        res.status(201).json(request);
    },

    filter: async (req, res) => {
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

        // On récupère les queries et on les mets en forme via le middleware

        const animals = await Animal.findAll({
            where: animalWhere,
            include: [
                {
                    model: Association,
                    as: "association",
                    where: associationWhere,
                },
            ],
        });

        res.json(animals);
    },
};

export { animalsController };
