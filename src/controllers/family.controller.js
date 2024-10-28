import { Family } from "../models/associations.js";

const familyController = {
    findOne: async (req, res, next) => {
        const { id } = req.params;

        const family = await Family.findByPk(id);

        if (!family) {
            return next();
        }

        res.json(family);
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