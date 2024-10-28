import { Router } from "express";
import { familyController } from "../controllers/family.controller.js";

const familyRoutes = Router();

familyRoutes.get("/:id(\\d+)", familyController.findOne);
familyRoutes.patch("/:id(\\d+)", familyController.update);
familyRoutes.delete("/:id(\\d+)", familyController.destroy);

export { familyRoutes };
