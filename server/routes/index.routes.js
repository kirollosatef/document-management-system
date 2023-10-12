import { Router } from 'express';
import userRouter from './user.routes.js';
import departmentRouter from './department.routes.js';
import folderRouter from './folder.routes.js';

const indexRouter = Router();

// Mount the user router under the /users path
indexRouter.use('/users', userRouter);
// Mount the department router under the /departments path
indexRouter.use('/departments', departmentRouter);
// Mount the folder router under the /folders path
indexRouter.use('/folders', folderRouter);

export default indexRouter;
