import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import authenticate from '../middlewares/authenticate.js';
import authorizate from '../middlewares/authorizate.js';

const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/list', authenticate, authorizate(0), userController.list);
userRouter.get('/:id', authenticate, authorizate(0), userController.get);
userRouter.put('/:id', authenticate, authorizate(0), userController.update);
userRouter.delete('/:id', authenticate, authorizate(0), userController.remove);

export default userRouter;
