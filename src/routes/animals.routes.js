import { Router } from "express";
import { animalsController } from "../controllers/animals.controller.js";
import { catchErrors } from "../middlewares/catchErrors.js";

const animalsRoutes = Router();

animalsRoutes.get("/", catchErrors(animalsController.index));
animalsRoutes.get("/:id(\\d+)", catchErrors(animalsController.findOne));
animalsRoutes.get("/search", catchErrors(animalsController.filter));
animalsRoutes.post("/request", catchErrors(animalsController.createRequest));

export { animalsRoutes };
