import jwt from "jsonwebtoken";

const createAuthToken = (user) => {
    try {
        return jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: "3h" });
    } catch (error) {
        console.error("Error generating token:", error);
    }
};

export { createAuthToken };