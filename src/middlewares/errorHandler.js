import { NotFoundError } from "./customErrors.js";

const notFound = (req, res, next) => {
    next(new NotFoundError());
};

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ error: err.message });
};

export { notFound, errorHandler };
