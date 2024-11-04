import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.auth_token;
    
    try {
        jwt.verify(token, process.env.JWT_SECRET);

    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
        return;
    }

    next();
};

export { verifyToken };