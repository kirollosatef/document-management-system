import { Router } from 'express';
import userRouter from './user.routes.js';
import departmentRouter from './department.routes.js';
import folderRouter from './folder.routes.js';
import archiveRouter from './archive.routes.js';
import fileRouter from './file.routes.js';
import statisticsRouter from './statistics.routes.js';

const indexRouter = Router();

// Mount the user router under the /users path
indexRouter.use('/users', userRouter);
// Mount the department router under the /departments path
indexRouter.use('/departments', departmentRouter);
// Mount the folder router under the /folders path
indexRouter.use('/folders', folderRouter);
// Mount the archive router under the /archives path
indexRouter.use('/archives', archiveRouter);
// Mount the file router under the /files path
indexRouter.use('/files', fileRouter);
// Mount the file router under the /statistics path
indexRouter.use('/statistics', statisticsRouter);

export default indexRouter;
