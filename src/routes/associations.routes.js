import { Router } from "express";
import { associationsController } from "../controllers/associations.controller.js";
import { catchErrors } from "../middlewares/catchError.js";

const associationsRoutes = Router();

associationsRoutes.get("/", catchErrors(associationsController.index));
associationsRoutes.get("/:id(\\d+)", catchErrors(associationsController.findOne));
associationsRoutes.get("/search", catchErrors(associationsController.filter));

export { associationsRoutes };
