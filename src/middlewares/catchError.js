import { ServerError } from "../utils/customErrors.js";

const catchErrors = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(new ServerError(error));
        }
    };
};

export { catchErrors };
