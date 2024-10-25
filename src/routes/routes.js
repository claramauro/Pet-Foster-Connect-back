import { Router } from "express";
import { associationsRoutes } from "./associations.routes.js";
import { animalsRoutes } from "./animals.routes.js";


const router = Router();

router.use("/associations", associationsRoutes);
router.use("/animals", animalsRoutes);

router.get("/", (req, res) => {
    /*
    fetch and return  res.json() 6 animals
     */
});

export { router };