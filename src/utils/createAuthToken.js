import jwt from "jsonwebtoken";

/**
 * @param {String} id
 * @param {String} role
 * @param {String} family_id
 * @param {String} association_id
 */
const createAuthToken = (id, role, family_id, association_id) => {
    if (!id || !role) {
        throw new Error(`${!id ? "id" : "role"} est obligatoire`);
    }
    try {
        const payload = {
            id,
            role,
            ...(family_id ? { family_id } : {}),
            ...(association_id ? { association_id } : {}),
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });
    } catch (error) {
        console.error("Erreur dans jwt.sign:", error); // Affiche l'erreur dans la console
        throw new Error(error);
    }
};

export { createAuthToken };
