import jwt from "jsonwebtoken";

/**
 * @param {String} id
 * @param {String} role
 * @param {String} family_id
 * @param {String} association_id
 */
const createAuthToken = (id, role, family_id, association_id) => {
    try {
        const payload = {
            id,
            role,
            ...(family_id ? { family_id } : {}),
            ...(association_id ? { association_id } : {}),
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });
    } catch (error) {
        console.error("Error generating token:", error);
    }
};

export { createAuthToken };
