import { Family } from "../models/associations.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import {
    getAbsolutePathOfImage,
    getRelativePathOfImage,
    removeImage,
} from "../utils/imageManager.js";
import { ValidationError, NotFoundError } from "../utils/customErrors.js";
import path from "node:path";

const familyController = {
    findOne: async (req, res, next) => {
        const { id } = req.params;

        const family = await Family.findByPk(id, {
            include: "department",
        });

        if (!family) {
            return next(new NotFoundError());
        }

        res.json(family);
    },

    update: async (req, res, next) => {
        const { family_id: id } = req.user;

        const { error } = validateAndSanitize.familyOrAssociationUpdate.validate(req.body);
        if (error) {
            return next(new ValidationError());
        }
        const familyData = req.body;

        const familyToUpdate = await Family.findByPk(id);
        if (!familyToUpdate) {
            return next(new NotFoundError());
        }
        // Dans le cas où une nouvelle image est téléchargée
        // On récupère le chemin absolu de l'ancienne image
        // Pour pouvoir la supprimer après la mise à jour de la bdd
        const oldImageAbsolutePath = getAbsolutePathOfImage(familyToUpdate.url_image);
        const oldImageName = oldImageAbsolutePath.replace("/src/public/images/families/", "");

        let relativePathNewImage;
        let isImageChange = false;
        if (Object.keys(req.files).length !== 0) {
            // Si une nouvelle image est téléchargée on récupère son chemin
            // Pour pouvoir mettre à jour l'url dans la bdd
            relativePathNewImage = getRelativePathOfImage(req.absolutePathImage);
            isImageChange = true;
        }
        let updatedFamily = await familyToUpdate.update({
            name: familyData.name || familyToUpdate.name,
            address: familyData.gender || familyToUpdate.address,
            zip_code: familyData.race || familyToUpdate.zip_code,
            city: familyData.city || familyToUpdate.city,
            department_id: familyData.department_id || familyToUpdate.department_id,
            phone_number: familyData.phone_number || familyToUpdate.phone_number,
            description: familyData.description || familyToUpdate.description,
            url_image: isImageChange ? relativePathNewImage : familyToUpdate.url_image,
        });
        if (isImageChange && oldImageName !== "default_family_img.svg") {
            // Une fois la famille mise à jour en BDD
            // on supprime l'ancienne image SI ce n'était pas l'image par défaut
            // (default_family_img.svg)
            await removeImage(oldImageAbsolutePath);
        }
        // Récupérer la famille mise à jour avec le département
        updatedFamily = await updatedFamily.reload({
            include: "department",
        });
        res.json(updatedFamily);
    },

    destroy: async (req, res, next) => {
        const { family_id: id } = req.user;
        const familyToDestroy = await Family.findByPk(id);
        if (!familyToDestroy) {
            return next(new NotFoundError());
        }
        const imageAbsolutePath = getAbsolutePathOfImage(familyToDestroy.url_image);
        const imageName = imageAbsolutePath.replace("/src/public/images/families/", "");
        await familyToDestroy.destroy();

        if (imageName !== "default_family_img.svg") {
            // on supprime l'image de la famille SI ce n'était pas l'image par défaut
            // (default_family_img.svg)
            await removeImage(imageAbsolutePath);
        }

        res.status(204).send();
    },
};

export { familyController };
