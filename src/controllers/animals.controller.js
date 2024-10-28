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
            const whereClause = {};
            
            if (query.species) whereClause.species = query.species; 
            if (query.department) whereClause.department = query.department; // ici mettre la requette qui va venir chercher dans la table ? 
            if (query.association) whereClause.association = query.association; 
            if (query.gender) whereClause.gender = query.gender; 
            // ici on vient construire un bon de la requête sequelize : Animal.lte vient chercher un animal qui a un age inférieur ou égale à l'âge récupéré dans la query. 
            if (query.age)  whereClause.age = {[Animal.lte]: parseInt(query.age)}
            if (query.size) whereClause.size = query.size;

            if (query.minAge) whereClause.age = { [Op.gte]: parseInt(query.minAge) };
            if (query.maxAge) whereClause.age = { ...whereClause.age, [Op.lte]: parseInt(query.maxAge) };
            
            return whereClause;
          };

        
        // On récupère les queries et on les mets en forme via le middleware 

        const whereClause = buildWhereClause(req.query); 

        const animals = await Animal.findAll({
            where:whereClause
        });

        res.json(animals); 



        // venir transformer age en un intervale 
        // gestion de sequelize pour gérer l'âge maximal : 
        

        // récupérer l'association de l'animal pour récupérer son département 


        
    },
};

export { animalsController };
