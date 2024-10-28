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
        const { id } = req.params;

        // Vérifie que les valeurs ne soit pas ""
        for (const key in req.body) {
            const value = req.body[key];
            // Set les valeurs à undefined si c'est le cas pour ne pas modifier la bdd
            if (value === "") {
                req.body[key] = undefined;
            }
        }

        await Family.update(req.body, { where: { id } });
        const updatedFamily = await Family.findByPk(id);

        res.json(updatedFamily);
    },
    
    destroy: async (req, res) => {
        /*
        delete family req.params and return "ok"
         */
    },

};

export { familyController };