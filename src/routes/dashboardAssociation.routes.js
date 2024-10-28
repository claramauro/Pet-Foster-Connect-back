import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";


const dashboardAssociationRoutes = Router();

dashboardAssociationRoutes.get("/association/animals", dashboardController.getAnimals);
dashboardAssociationRoutes.post("/association/animals", dashboardController.storeAnimal);
dashboardAssociationRoutes.patch("/association/animals/(\\d+)", dashboardController.updateAnimal);
dashboardAssociationRoutes.delete("/association/animals/(\\d+)", dashboardController.destroyAnimal);
dashboardAssociationRoutes.get("/association/profile", dashboardController.getProfile);
dashboardAssociationRoutes.patch("/association/profile", dashboardController.updateProfile);
dashboardAssociationRoutes.delete("/association/profile", dashboardController.destroyProfile);
dashboardAssociationRoutes.get("/association/request/", dashboardController.getRequests);
dashboardAssociationRoutes.patch("/association/request/:id(\\d+)", dashboardController.updateRequest);

export { dashboardAssociationRoutes };
