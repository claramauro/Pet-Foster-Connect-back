import { Family } from "../models/associations.js";
import { validateAndSanitize } from "../utils/validateAndSanitize.js";
import { removeImage } from "../utils/imageManager.js";
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
        console.log(req.cookies.auth_token);
        res.json(family);
    },

    update: async (req, res) => {
        const { id } = req.params;

        const { error, value } = validateAndSanitize.familyOrAssociationUpdate.validate(req.body);
        if (error) {
            return next(new ValidationError());
        }
        const familyData = {};
        // Vérifie que les valeurs ne soit pas ""
        for (const key in req.body) {
            let value = req.body[key];
            // Set les valeurs à undefined si c'est le cas pour ne pas modifier la bdd
            if (value === "") {
                value = undefined;
            } else {
                familyData[key] = value;
            }
        }
        const familyToUpdate = await Family.findByPk(id);
        if (!familyToUpdate) {
            return next(new NotFoundError());
        }
        // Dans le cas où une nouvelle image est téléchargée
        // On récupère le chemin absolu de l'ancienne image
        // Pour pouvoir la supprimer après la mise à jour de la bdd
        const oldImageAbsolutePath = path.join(
            import.meta.dirname,
            "../../public",
            familyToUpdate.url_image
        );
        const oldImageName = oldImageAbsolutePath.replace("/src/public/images/families/", "");
        let relativePathNewImage;
        let isImageChange = false;
        if (Object.keys(req.files).length !== 0) {
            // Si une nouvelle image est téléchargée on récupère son chemin
            // Pour pouvoir mettre à jour l'url dans la bdd
            relativePathNewImage = req.absolutePathImage.replace("/src/public", "");
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
        const { id } = req.params;
        const familyToDestroy = await Family.findByPk(id);
        if (!familyToDestroy) {
            return next(new NotFoundError());
        }
        const imagePath = path.join(import.meta.dirname, "../../public", familyToDestroy.url_image);
        const imageName = imagePath.replace("/src/public/images/families/", "");
        await familyToDestroy.destroy();
      
        if (imageName !== "default_family_img.svg") {
            // on supprime l'image de la famille SI ce n'était pas l'image par défaut
            // (default_family_img.svg)
            await removeImage(imagePath);
        }
      
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: false, // Secure à passer à true en prod
        });
        
        res.status(204).send();
    },
};

export { familyController };
