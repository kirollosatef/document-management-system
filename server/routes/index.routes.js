import { Router } from 'express';
import userRouter from './user.routes.js';

const indexRouter = Router();

// Mount the user router under the /users path
indexRouter.use('/users', userRouter);

export default indexRouter;
