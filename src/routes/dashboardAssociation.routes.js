import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";
import { catchErrors } from "../middlewares/catchError.js";

import { convertAndSaveImage } from "../middlewares/imageHandler.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isAssociationAuthorized } from "../middlewares/authorization.js";

const dashboardAssociationRoutes = Router();

dashboardAssociationRoutes.get(
    "/association/animals",
    [verifyToken, isAssociationAuthorized],
    catchErrors(dashboardController.getAnimals)
);

dashboardAssociationRoutes.post(
    "/association/animals",
    [verifyToken, isAssociationAuthorized, convertAndSaveImage],
    catchErrors(dashboardController.storeAnimal)
);

dashboardAssociationRoutes.patch(
    "/association/animals/:id(\\d+)",
    [verifyToken, isAssociationAuthorized, convertAndSaveImage],
    catchErrors(dashboardController.updateAnimal)
);

dashboardAssociationRoutes.delete(
    "/association/animals/:id(\\d+)",
    [verifyToken, isAssociationAuthorized],
    catchErrors(dashboardController.destroyAnimal)
);

dashboardAssociationRoutes.get(
    "/association/profile",
    [verifyToken, isAssociationAuthorized],
    catchErrors(dashboardController.getProfile)
);

dashboardAssociationRoutes.patch(
    "/association/profile",
    [verifyToken, isAssociationAuthorized, convertAndSaveImage],
    catchErrors(dashboardController.updateProfile)
);

dashboardAssociationRoutes.delete(
    "/association/profile",
    [verifyToken, isAssociationAuthorized],
    catchErrors(dashboardController.destroyProfile)
);

dashboardAssociationRoutes.get(
    "/association/request",
    [verifyToken, isAssociationAuthorized],
    catchErrors(dashboardController.getRequests)
);

dashboardAssociationRoutes.patch(
    "/association/request/:id(\\d+)",
    [verifyToken, isAssociationAuthorized],
    catchErrors(dashboardController.updateRequest)
);

export { dashboardAssociationRoutes };
