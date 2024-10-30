import Joi from "joi";
import sanitizeHTML from "sanitize-html";

// On crée une fonction de sanitization qu'on va pouvoir utiliser avec JOI pour lui permettre à la fois de valider le type et de supprimer les script

// Fonction sanitize

const sanitizeString = (string) => {
    if (typeof string !== "string") return string;
    return sanitizeHTML(string, {
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
        association_id: JoiSanitized.string().sanitize().optional(),
        department_id: JoiSanitized.string().sanitize().optional(),
    }),
    familyOrAssociationUpdate: JoiSanitized.object({
        name: JoiSanitized.string().sanitize().optional(),
        address: JoiSanitized.string().sanitize().optional(),
        zip_code: JoiSanitized.string().max(5).sanitize().optional(),
        city: JoiSanitized.string().sanitize().optional(),
        department_id: JoiSanitized.string().sanitize().optional(),
        phone_number: JoiSanitized.string().max(15).sanitize().optional(),
        description: JoiSanitized.string().sanitize().optional(),
        url_image: JoiSanitized.string().sanitize().optional(),
    }),
    associationSearchFilter: JoiSanitized.object({
        department: JoiSanitized.string().max(20).sanitize().optional(),
        species: JoiSanitized.string().max(10).sanitize().optional(),
    }),
    animalStoreOrUpdate: JoiSanitized.object({
        name: JoiSanitized.string().max(20).sanitize().optional(),
        species: JoiSanitized.string().max(10).sanitize().optional(),
        age: JoiSanitized.string().max(2).sanitize().optional(),
        size: JoiSanitized.string().max(10).sanitize().optional(),
        gender: JoiSanitized.string().max(10).sanitize().optional(),
        association_id: Joi.number().integer().min(1).optional(),
        department_id: Joi.number().integer().min(1).optional(),
        race: JoiSanitized.string().max(10).sanitize().optional(),
        description: JoiSanitized.string().max(500).sanitize().optional(),
        url_image: JoiSanitized.string().max(30).sanitize().optional(),
        availability: JoiSanitized.boolean(),
        family_id: Joi.number().integer().min(1).optional(),
    }),
    updateRequest: JoiSanitized.object({
        status: JoiSanitized.string().max(20).sanitize().optional(),
    }),
};

export { validateAndSanitize };
