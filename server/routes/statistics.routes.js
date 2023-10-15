import { Router } from 'express';
import statisticsController from '../controllers/statistics.controller.js';
import authenticate from '../middlewares/authenticate.js';
import authorizate from '../middlewares/authorizate.js';

const statisticsRouter = Router();

statisticsRouter.get('/', authenticate, authorizate(2), statisticsController.list);

export default statisticsRouter;
