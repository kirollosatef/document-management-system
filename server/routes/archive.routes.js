import { Router } from 'express';
import archiveController from '../controllers/archive.controller.js';
import authenticate from '../middlewares/authenticate.js';
import authorizate from '../middlewares/authorizate.js';

const archiveRouter = Router();

archiveRouter.post('/:folderId', authenticate, authorizate(1), archiveController.create);
archiveRouter.get('/', authenticate, authorizate(2), archiveController.list);
archiveRouter.get('/:id', authenticate, authorizate(2), archiveController.get);
archiveRouter.put('/:id', authenticate, authorizate(1), archiveController.update);
archiveRouter.delete('/:id', authenticate, authorizate(0), archiveController.remove);

export default archiveRouter;
