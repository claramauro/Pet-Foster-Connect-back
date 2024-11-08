import { Association } from "../models/associations.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { ValidationError } from "../utils/customErrors.js";

const associationsController = {
    index: async (req, res) => {
        /*
       fetch and return  res.json() all associations
        */
        const associations = await Association.findAll({
            include: "department",
        });
    
          /* Query pour l'affichage des associations en fonction de la page */
          const currentPage = req.query.page || 1;
          const limit = 6; // Nombre d'associations max par page
          const offset = (Number(currentPage) - 1) * limit; // Offset de 6 - 12 - 18... en fonction de la page courante
  
          /* Pagination */
          const paginatedAssociations = await Association.findAll({
              include: [
                  { association: "department" },
                  { association: "animals" },
              ],
              limit: limit,
              offset: offset,
          });
  
          res.json({
              allAssociations: associations,
              paginatedAssociations: paginatedAssociations,
          });
      },
      
    findOne: async (req, res, next) => {
        /*
    fetch with req.params and return res.json() one association
     */
        const { id } = req.params;
        const association = await Association.findByPk(id, {
            include: "department",
        });
        if (!association) {
            return next();
        }
        res.json(association);
    },

    filter: async (req, res, next) => {
        /*
        fetch, filter with req.query and return res.json() all corresponding associations
         */

        const buildWhereClause = (query) => {
            // Validation des données
            const { error, value } = validateAndSanitize.associationSearchFilter.validate(query);
            if (error) {
                return next(new ValidationError());
            }

            const associationWhere = {};
            const animalWhere = {};

            if (query.department_id) associationWhere.department_id = query.department_id;
            if (query.species) animalWhere.species = query.species;

            return { associationWhere, animalWhere };
        };

        const { associationWhere, animalWhere } = buildWhereClause(req.query);

        
        const currentPage = req.query.page || 1;

        const limit = 6; // Nombre d'associations max
        const offset = (Number(currentPage) - 1) * limit; // Pagination

        const filterAssociations = await Association.findAll({
            where: associationWhere,  // Application du filtre
            include: [
                "department",
                {
                    model: Animal,
                    as: "animals",  // Le modèle Animal est inclus ici
                    where: animalWhere,  // Application du filtre sur les animaux
                    include: "department",
                },
            ],
        });

        // On pagine le résultat des associations par rapport à la limite (nb d'associations) et l'offset (correspondant au numéro de page demandé)
        const paginatedAssociations = filterAssociations.slice(offset, offset + limit);

        // On renvoie le nombre total d'associations retourné par la requête filtrée et les associations paginées
        res.json({
            totalAssociationCount: filterAssociations.length,
            paginatedAssociations: paginatedAssociations,
        });
    },
};

export { associationsController };