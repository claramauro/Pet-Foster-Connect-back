import { AuthorizationError } from "../utils/customErrors.js";

const isFamillyAuthorized = (req, res, next) => {
    console.log(req.user);
    next();
};

const isAssociationAuthorized = (req, res, next) => {
    const { role } = req.user;
    if (role === "association") {
        return next();
    } else {
        return next(new AuthorizationError());
    }
};

export { isFamillyAuthorized, isAssociationAuthorized };
