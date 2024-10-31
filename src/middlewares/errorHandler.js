import { removeImage } from "../utils/deleteImage.js";
import { NotFoundError } from "../utils/customErrors.js";

const notFound = (req, res, next) => {
    next(new NotFoundError());
};

const errorHandler = (err, req, res, next) => {
    if (req.imagePath) {
        removeImage(req.imagePath);
    }
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ error: err.message });
};

export { notFound, errorHandler };
