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
        animal_id: Joi.number().integer().required(),
        association_id: Joi.number().integer().required(),
    }),
    animalSearchFilter: JoiSanitized.object({
        species: JoiSanitized.string().trim().min(1).sanitize().optional(),
        age: JoiSanitized.string().trim().min(1).sanitize().optional(),
        size: JoiSanitized.string().trim().min(1).sanitize().optional(),
        gender: JoiSanitized.string().trim().min(1).sanitize().optional(),
        association_id: JoiSanitized.string().trim().min(1).sanitize().optional(),
        department_id: JoiSanitized.string().trim().min(1).sanitize().optional(),
        page: JoiSanitized.string().trim().min(1).sanitize().optional(),
    }),
    familyOrAssociationUpdate: JoiSanitized.object({
        name: JoiSanitized.string().trim().min(1).sanitize().optional(),
        address: JoiSanitized.string().trim().min(1).sanitize().optional(),
        zip_code: JoiSanitized.string().trim().min(1).sanitize().optional(),
        city: JoiSanitized.string().trim().min(1).sanitize().optional(),
        department_id: JoiSanitized.string().trim().min(1).sanitize().optional(),
        phone_number: JoiSanitized.string().trim().min(1).sanitize().optional(),
        description: JoiSanitized.string().trim().min(1).sanitize().optional(),
    }),
    associationSearchFilter: JoiSanitized.object({
        association_id: JoiSanitized.string().trim().min(1).optional(),
        department_id: JoiSanitized.string().trim().min(1).sanitize().optional(),
        species: JoiSanitized.string().trim().min(1).sanitize().optional(),
        page: JoiSanitized.string().trim().min(1).sanitize().optional(),
    }),
    animalStore: JoiSanitized.object({
        name: JoiSanitized.string().trim().min(1).sanitize().required(),
        species: JoiSanitized.string().trim().min(1).sanitize().required(),
        age: JoiSanitized.string().trim().min(1).sanitize().required(),
        size: JoiSanitized.string().trim().min(1).sanitize().required(),
        gender: JoiSanitized.string().trim().min(1).sanitize().required(),
        race: JoiSanitized.string().trim().min(1).sanitize().optional(),
        description: JoiSanitized.string().trim().min(1).sanitize().required(),
        availability: JoiSanitized.boolean().required(),
        family_id: Joi.number().integer().optional(),
    }),
    animalUpdate: JoiSanitized.object({
        name: JoiSanitized.string().trim().min(1).sanitize().optional(),
        species: JoiSanitized.string().trim().min(1).sanitize().optional(),
        age: JoiSanitized.string().trim().min(1).sanitize().optional(),
        size: JoiSanitized.string().trim().min(1).sanitize().optional(),
        gender: JoiSanitized.string().trim().min(1).sanitize().optional(),
        department_id: Joi.number().integer().min(1).optional(),
        race: JoiSanitized.string().trim().min(1).sanitize().optional(),
        description: JoiSanitized.string().trim().min(1).sanitize().optional(),
        availability: JoiSanitized.boolean(),
        family_id: Joi.number().integer().min(1).optional(),
    }),
    updateRequestAssociation: JoiSanitized.object({
        status: JoiSanitized.string().trim().min(1).sanitize().required(),
    }),
    familyOrAssociationRegister: JoiSanitized.object({
        /* Famille ou asso */
        name: JoiSanitized.string().trim().min(1).sanitize().optional(),
        address: JoiSanitized.string().trim().min(1).sanitize().required(),
        zip_code: JoiSanitized.string().trim().min(1).sanitize().required(),
        city: JoiSanitized.string().trim().min(1).sanitize().required(),
        department_id: Joi.number().integer().min(1).optional(),
        phone_number: JoiSanitized.string().trim().min(1).sanitize().required(),
        description: JoiSanitized.string().trim().min(1).sanitize().optional(),
        email_association: JoiSanitized.string().trim().min(1).sanitize(),

        /* user */
        email: JoiSanitized.string().trim().min(1).email().required(),
        password: JoiSanitized.string().trim().min(1).required(),
        confirmPassword: JoiSanitized.string().trim().min(1).required(),
        role: JoiSanitized.string().trim().min(1).required(),
        association_id: Joi.number().integer().min(1).optional(),
        family_id: Joi.number().integer().min(1).optional(),
    }),
    familyOrAssociationLogin: JoiSanitized.object({
        email: JoiSanitized.string().trim().min(1).email().required(),
        password: JoiSanitized.string().trim().min(1).required(),
    }),
};

export { validateAndSanitize };
