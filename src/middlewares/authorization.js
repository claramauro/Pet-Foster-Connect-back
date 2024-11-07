import { AuthorizationError } from "../utils/customErrors.js";

const isFamilyAuthorized = (req, res, next) => {
    const { role } = req.user;
    if (role === "family") {
        return next();
    } else {
        return next(new AuthorizationError());
    }
};

const isAssociationAuthorized = (req, res, next) => {
    const { role } = req.user;
    if (role === "association") {
        return next();
    } else {
        return next(new AuthorizationError());
    }
};

export { isFamilyAuthorized, isAssociationAuthorized };
