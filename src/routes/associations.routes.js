import { Router } from "express";
import { associationsController } from "../controllers/associations.controller.js";

const associationsRoutes = Router();

associationsRoutes.get("/", associationsController.index);
associationsRoutes.get("/:id(\\d+)", associationsController.findOne);
associationsRoutes.get("/search", associationsController.filter);

export { associationsRoutes };
