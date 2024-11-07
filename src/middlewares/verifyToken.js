import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        res.status(401).json({ message: "Missing authorization token" });
        return;
    }
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });

        req.user = user; // on assigne le payload décodé à req.user pour le réutiliser
        next();
    });
};


export { verifyToken };