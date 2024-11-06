import jwt from "jsonwebtoken";

const createAuthToken = (id, role) => {
    try {
        const payload = { id, role };

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });
    } catch (error) {
        console.error("Error generating token:", error);
    }
};

export { createAuthToken };