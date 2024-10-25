import {Router} from 'express';
import {associationsController} from "../controllers/associations.controller.js";

const associationRoutes  = Router();

associationRoutes.get('/', associationsController.index);
associationRoutes.get('/:id(\\d+)', associationsController.findOne)
associationRoutes.get('/search', associationsController.filter)

export {associationRoutes};
