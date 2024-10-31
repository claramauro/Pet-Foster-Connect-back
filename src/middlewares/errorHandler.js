import { removeImage } from "../utils/imageManager.js";
import { NotFoundError } from "../utils/customErrors.js";

const notFound = (req, res, next) => {
    next(new NotFoundError());
};

const errorHandler = async (err, req, res, next) => {
    console.log(err);

    if (req.absolutePathImage) {
        await removeImage(req.absolutePathImage);
    }
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ error: err.message });
};

export { notFound, errorHandler };
