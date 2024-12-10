import { Router } from "express";
import { requestsController } from "../controllers/requests.controller.js";
import { catchErrors } from "../middlewares/catchError.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isFamilyAuthorized } from "../middlewares/authorization.js";
import { isAssociationAuthorized } from "../middlewares/authorization.js";

const requestsRoutes = Router();

// Pour les familles

requestsRoutes.get(
    "/family",
    [verifyToken, isFamilyAuthorized],
    catchErrors(requestsController.getRequestsFamily)
);
requestsRoutes.post(
    "/family",
    [verifyToken, isFamilyAuthorized],
    catchErrors(requestsController.createRequestFamily)
);
requestsRoutes.delete(
    "/family/:id(\\d+)",
    [verifyToken, isFamilyAuthorized],
    catchErrors(requestsController.destroyRequestFamily)
);

// Pour les associations

requestsRoutes.get(
    "/associations",
    [verifyToken, isAssociationAuthorized],
    catchErrors(requestsController.getRequestsAssociations)
);
requestsRoutes.patch(
    "/associations/:id(\\d+)",
    [verifyToken, isAssociationAuthorized],
    catchErrors(requestsController.updateRequestAssociation)
);

export { requestsRoutes };
