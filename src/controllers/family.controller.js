import { Family } from "../models/associations.js";
import { validateAndSanitize } from "../middlewares/validateAndSanitize";

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

        const { error, value } = validateAndSanitize.familyUpdate.validate(req.params);
        if (error) {
            return next(error);
        }

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

    destroy: async (req, res, next) => {
        const { id } = req.params;

        const familyToDestroy = await Family.findByPk(id);

        if (!familyToDestroy) {
            return next();
        }

        await familyToDestroy.destroy();
        res.status(204).send();

        /*
        TODO Ajouter la logique pour déconnecter automatiquement l'utilisateur après la suppression de la famille
         */
    },
};

export { familyController };
