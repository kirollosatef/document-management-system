import { Router } from 'express';
import departmentController from '../controllers/department.controller.js';
import authenticate from '../middlewares/authenticate.js';
import authorizate from '../middlewares/authorizate.js';

const departmentRouter = Router();

departmentRouter.post('/', authenticate, authorizate(0), departmentController.create);
departmentRouter.get('/', authenticate, authorizate(0), departmentController.list);
departmentRouter.get('/:id', authenticate, authorizate(0), departmentController.get);
departmentRouter.put('/:id', authenticate, authorizate(0), departmentController.update);
departmentRouter.delete('/:id', authenticate, authorizate(0), departmentController.remove);

export default departmentRouter;