import { Animal } from "../models/associations.js";
import {Request} from "../models/Request.js"; 
// import Joi from 'joi'; 

const animalsController = {
    index: async (req, res) => {
        /*
       fetch and return  res.json() all animals
        */
        const animals = await Animal.findAll(
            include: [
                {association: "association"}, 
                {association: "family"}
            ]
        );
        res.json(animals);
    },
    findOne: async (req, res) => {
        /*
        fetch with req.params and return res.json() one association
         */
        const { id } = req.params;
        const animal = await Animal.findByPk(id, 
            include: [
                {association: "association"}, 
                {association: "family"}
            ]
        );
        res.json(animal);
    },

    createRequest: async (req, res) => {
        /*
        create request with association_id (user_id) family_id (user_id) and animal_id return res.json() request
         */
        const {family_id, animal_id} = req.body; 
        
        // const schema = Joi.object({
        //     family_id: Joi.number().integer().min(1).required(),
        //     animal_id: Joi.number().integer().min(1).required(),
        // });

        // const { error } = schema.validate({ family_id, animal_id});

        // if(error){
        //     const customError = new Error('An error occured');
        //     customError.statusCode = 400;
        //     return next(customError); 
        // }
       
        const status= "En cours"; 

        const request = await Request.create(status, family_id, animal_id); 
        res.status(201).json(request); 
    },

    filter: async (req, res) => {
        /*
        fetch, filter with req.query and return res.json() all corresponding animals
         */

        // Middleware de gestion des queries pour vérifier si undefined ou non + transformer age récupéré en intervale (inférieur ou égal) - Ce middleware vient construire la requ$ete where qu'on va passer à sequelize

        const buildWhereClause = (query) => {
            const animalWhere = {};
            const associationWhereClause = {};
            
            if (query.species) animalWhere.species = query.species;             
            if (query.age)  animalWhere.age = {[Animal.lte]: parseInt(query.age)}
            if (query.size) animalWhere.size = query.size;   
            if (query.gender) animalWhere.gender = query.gender;
            if (query.association) animalWhere.association = query.association; 
            
            // Gestion association et animalWhere pour chercher la localisation via l'association
            if (query.department) associationWhereClause.department = query.department;
            if (query.association) associationWhereClause.id = query.association; //

            return {animalWhere: animalWhere, associationWhere: associationWhereClause};
          };

        
        // On récupère les queries et on les mets en forme via le middleware 


        const animals = await Animal.findAll({
            where: animalWhere,
            include: [{
                model: Association,
                where: associationWhere,
                // fonctionne même si le filtre n'est pas appliqué
                required: false
            }]
        });

        res.json(animals); 
        
    },
};

export { animalsController };
