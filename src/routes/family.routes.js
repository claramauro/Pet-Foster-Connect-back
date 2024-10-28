import { Router } from "express";
import { familyController } from "../controllers/family.controller.js";
import { catchErrors } from "../middlewares/catchError.js";

const familyRoutes = Router();

familyRoutes.get("/:id(\\d+)", catchErrors(familyController.findOne));
familyRoutes.patch("/:id(\\d+)", catchErrors(familyController.update));
familyRoutes.delete("/:id(\\d+)", catchErrors(familyController.destroy));

export { familyRoutes };
