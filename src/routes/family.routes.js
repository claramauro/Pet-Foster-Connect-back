import { Router } from "express";
import { familyController } from "../controllers/family.controller.js";
import { catchErrors } from "../middlewares/catchError.js";

import { convertAndSaveImage } from "../middlewares/imageHandler.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isFamilyAuthorized } from "../middlewares/authorization.js";

const familyRoutes = Router();

// Pour findOne Family pas besoin du Middleware Authorization car famille et asso y ont accès
// La vérification du token suffit
familyRoutes.get("/:id(\\d+)", verifyToken, catchErrors(familyController.findOne));
familyRoutes.patch(
    "/",
    [verifyToken, isFamilyAuthorized, convertAndSaveImage],
    catchErrors(familyController.update)
);
familyRoutes.delete("/", [verifyToken, isFamilyAuthorized], catchErrors(familyController.destroy));

export { familyRoutes };
