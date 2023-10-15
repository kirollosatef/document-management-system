import { Router } from 'express';
import userRouter from './user.routes.js';
import departmentRouter from './department.routes.js';
import folderRouter from './folder.routes.js';
import archiveRouter from './archive.routes.js';

const indexRouter = Router();

// Mount the user router under the /users path
indexRouter.use('/users', userRouter);
// Mount the department router under the /departments path
indexRouter.use('/departments', departmentRouter);
// Mount the folder router under the /folders path
indexRouter.use('/folders', folderRouter);
// Mount the archive router under the /archives path
indexRouter.use('/archives', archiveRouter);

export default indexRouter;
