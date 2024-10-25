import { Router } from "express";
import { animalsController } from "../controllers/animals.controller.js";

const animalsRoutes = Router();

animalsRoutes.get("/", animalsController.index);
animalsRoutes.get("/:id(\\d+)", animalsController.findOne);
animalsRoutes.get("/search", animalsController.filter);
animalsRoutes.post("/request", animalsController.createRequest);

export { animalsRoutes };
