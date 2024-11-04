import { Router } from "express";
import { familyController } from "../controllers/family.controller.js";
import { catchErrors } from "../middlewares/catchError.js";

import { convertAndSaveImage } from "../middlewares/imageHandler.js";

const familyRoutes = Router();

familyRoutes.get("/:id(\\d+)", catchErrors(familyController.findOne));
familyRoutes.patch("/:id(\\d+)", convertAndSaveImage, catchErrors(familyController.update));
familyRoutes.delete("/:id(\\d+)", catchErrors(familyController.destroy));

export { familyRoutes };
