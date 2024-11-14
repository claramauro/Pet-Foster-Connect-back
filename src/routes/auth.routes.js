import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { catchErrors } from "../middlewares/catchError.js";
import { convertAndSaveImage } from "../middlewares/imageHandler.js";


const authRoutes = Router();

authRoutes.post("/register/:type", convertAndSaveImage, catchErrors(authController.register));
authRoutes.post("/login", catchErrors(authController.login));
authRoutes.get("/family/:familyId", catchErrors(authController.getFamilyUser));
authRoutes.get("/association/:associationId", catchErrors(authController.getAssociationUser));

/* Reset password*/

authRoutes.post("/resetpassword", catchErrors(authController.resetPassword));
authRoutes.get("/resetpassword/confirm", catchErrors(authController.resetPasswordConfirm));
authRoutes.patch("/updatepassword/:email", catchErrors(authController.updatePassword));

export { authRoutes };
