import { Animal } from "../models/associations.js";
import {Request} from "../models/Request.js"; 

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
        const {family_id, animal_id} = req.body; // venir valider ces entrées
        const status= "En cours"; 

        const request = await Request.create(status, family_id, animal_id); 
        res.status(201).json(request); 
    },

    filter: async (req, res) => {
        /*
        fetch, filter with req.query and return res.json() all corresponding animals
         */
    },
};

export { animalsController };
