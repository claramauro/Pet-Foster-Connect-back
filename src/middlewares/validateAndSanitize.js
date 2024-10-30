import Joi from "joi";
import sanitizeHTML from "sanitize-html";

// On crée une fonction de sanitization qu'on va pouvoir utiliser avec JOI pour lui permettre à la fois de valider le type et de supprimer les script

// Fonction sanitize

const sanitizeString = (string) => {
    if (typeof string !== "string") return string;
    return sanitizeHtml(string, {
        allowedTags: [], // Ne permet aucune balise HTML
        allowedAttributes: {}, // Ne permet aucun attribut
    });
};

// On étend JOI avec la fonction sanitize : on pourra appeler JoiSanitized sur les string pour vérifier qu'il n'y a pas de script (grâce à sanitiehtml), tout en incluant les fonctionnalités de base de JOI.

const JoiSanitized = Joi.extend((joi) => ({
    type: "string",
    base: joi.string(),
    rules: {
        sanitize: {
            validate(value, helpers) {
                const sanitized = sanitizeString(value);
                if (sanitized !== value) {
                    return helpers.error("string.sanitized");
                }
                return sanitized;
            },
        },
    },
}));

// Ajouter des min et max

const validateAndSanitize = {
    createAnimalRequest: Joi.object({
        family_id: Joi.number().integer().min(1).required(),
        animal_id: Joi.number().integer().min(1).required(),
    }),
    animalSearchFilter: JoiSanitized.object({
        species: JoiSanitized.string().sanitize().optional(),
        age: JoiSanitized.string().sanitize().optional(),
        size: JoiSanitized.string().sanitize().optional(),
        gender: JoiSanitized.string().sanitize().optional(),
        association_id: Joi.number().integer().optional(),
        department: JoiSanitized.string().sanitize().optional(),
        association: Joi.number().integer().optional(),
    }),
    familyUpdate: JoiSanitized.object({
        name: JoiSanitized.string().sanitize().optional(),
        address: JoiSanitized.string().sanitize().optional(),
        zip_code: JoiSanitized.string().max(5).sanitize().optional(),
        city: JoiSanitized.string().sanitize().optional(),
        department: JoiSanitized.string().sanitize().optional(),
        phone_number: JoiSanitized.string().max(15).sanitize().optional(),
        description: JoiSanitized.string().sanitize().optional(),
        url_image: JoiSanitized.string().sanitize().optional(),
    }),
};

export { validateAndSanitize };
