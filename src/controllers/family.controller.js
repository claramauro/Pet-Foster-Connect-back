import { Family } from "../models/associations.js";

const familyController = {

    findOne: async (req, res) => {
        const { id } = req.params;

        const family = await Family.findByPk(id)

        console.log(family);

        res.end();

    },

    update: async (req, res) => {
        /*
        update family with req.params and return res.json() updated family
         */
    },

    destroy: async (req, res) => {
        /*
        delete family req.params and return "ok"
         */
    },

};

export { familyController };