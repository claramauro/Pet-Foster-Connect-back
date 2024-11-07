import { Router } from "express";
import { familyController } from "../controllers/family.controller.js";
import { catchErrors } from "../middlewares/catchError.js";

import { convertAndSaveImage } from "../middlewares/imageHandler.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const familyRoutes = Router();

familyRoutes.get("/:id(\\d+)", verifyToken, catchErrors(familyController.findOne));
familyRoutes.patch("/:id(\\d+)", verifyToken, convertAndSaveImage, catchErrors(familyController.update));
familyRoutes.delete("/:id(\\d+)", verifyToken, catchErrors(familyController.destroy));

export { familyRoutes };
