import { Animal, Request, Family, Association } from "../models/associations.js";
import { Sequelize } from "sequelize";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { ValidationError, NotFoundError } from "../utils/customErrors.js";
import { sendEmailAssociationForRequestAnimal } from "../utils/sendEmail/SendEmailAssociationForRequestAnimal.js";

const animalsController = {
    index: async (req, res) => {
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

    filter: async (req, res, next) => {
        const buildWhereClause = (query) => {
            const { error } = validateAndSanitize.animalSearchFilter.validate(query);
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

            // Filtrer les animaux par disponibilité
            if (query.availability) {
                animalWhere.availability = query.availability;
            }

            // Gestion association et animalWhere pour chercher la localisation via l'association
            if (query.department_id) associationWhereClause.department_id = query.department_id;
            if (query.association) associationWhereClause.id = query.association; //

            return { animalWhere: animalWhere, associationWhere: associationWhereClause };
        };

        // On appelle buildWhereClause pour récupérer animalWhere et associationWhere
        const { animalWhere, associationWhere } = buildWhereClause(req.query);
        console.log(animalWhere);

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
};

export { animalsController };
