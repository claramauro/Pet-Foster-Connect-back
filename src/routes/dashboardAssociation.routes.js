import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";
import { catchErrors } from "../middlewares/catchError.js";

import { convertAndSaveImage } from "../middlewares/imageHandler.js";

const dashboardAssociationRoutes = Router();

dashboardAssociationRoutes.get("/association/animals", catchErrors(dashboardController.getAnimals));

dashboardAssociationRoutes.post(
    "/association/animals",
    convertAndSaveImage,
    catchErrors(dashboardController.storeAnimal)
);

dashboardAssociationRoutes.patch(
    "/association/animals/:id(\\d+)",
    catchErrors(dashboardController.updateAnimal)
);

dashboardAssociationRoutes.delete(
    "/association/animals/:id(\\d+)",
    catchErrors(dashboardController.destroyAnimal)
);

dashboardAssociationRoutes.get("/association/profile", catchErrors(dashboardController.getProfile));

dashboardAssociationRoutes.patch(
    "/association/profile",
    catchErrors(dashboardController.updateProfile)
);

dashboardAssociationRoutes.delete(
    "/association/profile/:id(\\d+)",
    catchErrors(dashboardController.destroyProfile)
);

dashboardAssociationRoutes.get(
    "/association/request/",
    catchErrors(dashboardController.getRequests)
);

dashboardAssociationRoutes.patch(
    "/association/request/:id(\\d+)",
    catchErrors(dashboardController.updateRequest)
);

export { dashboardAssociationRoutes };
