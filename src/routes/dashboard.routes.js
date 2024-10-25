import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";


const dashboardRoutes = Router();

dashboardRoutes.get("/animals", dashboardController.getAnimals);
dashboardRoutes.post("/animals", dashboardController.storeAnimal);
dashboardRoutes.patch("/animals/(\\d+)", dashboardController.updateAnimal);
dashboardRoutes.delete("/animals/(\\d+)", dashboardController.destroyAnimal);
dashboardRoutes.get("/profile", dashboardController.getProfile);
dashboardRoutes.patch("/profile", dashboardController.updateProfile);
dashboardRoutes.delete("/profile", dashboardController.destroyProfile);
dashboardRoutes.get("/request/", dashboardController.getRequests);
dashboardRoutes.patch("/request/:id(\\d+)", dashboardController.updateRequest);

export { dashboardRoutes };
