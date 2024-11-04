import { Family } from "../models/associations.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { ValidationError, NotFoundError } from "../utils/customErrors.js";

const familyController = {
    findOne: async (req, res, next) => {
        const { id } = req.params;

        const family = await Family.findByPk(id, {
            include: "department",
        });

        if (!family) {
            return next(new NotFoundError());
        }
        console.log(req.cookies.auth_token);
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

        await Family.update(req.body, { where: { id: id } });

        const updatedFamily = await Family.findByPk(id, {
            include: "department",
        });

        res.json(updatedFamily);
    },

    destroy: async (req, res, next) => {
        const { id } = req.params;

        const familyToDestroy = await Family.findByPk(id);

        if (!familyToDestroy) {
            return next(new NotFoundError());
        }

        await familyToDestroy.destroy();

        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: false, // Secure à passer à true en prod
        });
        
        res.status(204).send();
    },
};

export { familyController };
