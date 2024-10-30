import { Router } from "express";
import { associationsRoutes } from "./associations.routes.js";
import { animalsRoutes } from "./animals.routes.js";
import { dashboardAssociationRoutes } from "./dashboardAssociation.routes.js";
import { familyRoutes } from "./family.routes.js";
import { departmentsRoutes } from "./departments.routes.js";

const router = Router();

router.use("/associations", associationsRoutes);
router.use("/animals", animalsRoutes);
router.use("/dashboard", dashboardAssociationRoutes);
router.use("/family", familyRoutes);
router.use("/departments", departmentsRoutes);

router.get("/", (req, res) => {
    /*
    fetch and return  res.json() 6 animals
     */
});

export { router };
