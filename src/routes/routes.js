import {Router} from 'express';
import { associationRoutes } from "./associations.routes.js";


const router = Router();

router.use("/associations", associationRoutes)

router.get('/', (req, res) => {
    /*
    fetch and return  res.json() 6 animals
     */
})

export {router}