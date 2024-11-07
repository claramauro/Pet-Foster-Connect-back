import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";
import { catchErrors } from "../middlewares/catchError.js";

import { convertAndSaveImage } from "../middlewares/imageHandler.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const dashboardAssociationRoutes = Router();

dashboardAssociationRoutes.get("/association/animals", verifyToken, catchErrors(dashboardController.getAnimals));

dashboardAssociationRoutes.post(
    "/association/animals", verifyToken,
    convertAndSaveImage,
    catchErrors(dashboardController.storeAnimal)
);

dashboardAssociationRoutes.patch(
    "/association/animals/:id(\\d+)", verifyToken,
    convertAndSaveImage, 
    catchErrors(dashboardController.updateAnimal)
);

dashboardAssociationRoutes.delete(
    "/association/animals/:id(\\d+)", verifyToken,
    catchErrors(dashboardController.destroyAnimal)
);

dashboardAssociationRoutes.get("/association/profile", verifyToken, catchErrors(dashboardController.getProfile));

dashboardAssociationRoutes.patch(
    "/association/profile", verifyToken,
    convertAndSaveImage,
    catchErrors(dashboardController.updateProfile)
);

dashboardAssociationRoutes.delete(
    "/association/profile/:id(\\d+)", verifyToken,
    catchErrors(dashboardController.destroyProfile)
);

dashboardAssociationRoutes.get(
    "/association/request/", verifyToken,
    catchErrors(dashboardController.getRequests)
);

dashboardAssociationRoutes.patch(
    "/association/request/:id(\\d+)", verifyToken,
    catchErrors(dashboardController.updateRequest)
);

export { dashboardAssociationRoutes };
