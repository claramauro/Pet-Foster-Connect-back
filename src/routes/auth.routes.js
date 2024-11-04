import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { catchErrors } from "../middlewares/catchError.js";


const authRoutes = Router();

authRoutes.post("/register/:type", catchErrors(authController.register));
authRoutes.post("/login", catchErrors(authController.login));
authRoutes.post("/logout", catchErrors(authController.logout));

export { authRoutes };
