import { Router } from "express";
import { departmentsController } from "../controllers/departments.controller.js";
import { catchErrors } from "../middlewares/catchError.js";

const departmentsRoutes = Router();

departmentsRoutes.get("/", catchErrors(departmentsController.index));

export { departmentsRoutes };
