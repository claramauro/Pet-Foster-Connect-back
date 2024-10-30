import { Family } from "../models/associations.js";
import { validateAndSanitize } from "../middlewares/validateAndSanitize.js";
import { ValidationError, NotFoundError } from "../middlewares/customErrors.js";

const familyController = {
    findOne: async (req, res, next) => {
        const { id } = req.params;

        const family = await Family.findByPk(id);

        if (!family) {
            return next(new NotFoundError());
        }

        res.json(family);
    },

    update: async (req, res) => {
        const { id } = req.params;

        const { error, value } = validateAndSanitize.familyOrAssociationUpdate.validate(req.body);
        if (error) {
            return next(new ValidationError());
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
            return next(new NotFoundError());
        }

        await familyToDestroy.destroy();
        res.status(204).send();

        /*
        TODO Ajouter la logique pour déconnecter automatiquement l'utilisateur après la suppression de la famille
         */
    },
};

export { familyController };
