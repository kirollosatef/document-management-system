import { Router } from 'express';
import archiveController from '../controllers/archive.controller.js';
import authenticate from '../middlewares/authenticate.js';
import authorizate from '../middlewares/authorizate.js';
import multer from 'multer';

const archiveRouter = Router();
const upload = multer().array('files');

archiveRouter.post('/:folderId', authenticate, authorizate(1), upload, archiveController.create);
archiveRouter.get('/', authenticate, authorizate(2), archiveController.list);
archiveRouter.get('/:id', authenticate, authorizate(2), archiveController.get);
archiveRouter.put('/:id', authenticate, authorizate(1), archiveController.update);
archiveRouter.delete('/:id', authenticate, authorizate(0), archiveController.remove);
archiveRouter.post('/', authenticate, authorizate(2), archiveController.search);
archiveRouter.post('/trash/:id', authenticate, authorizate(1), archiveController.moveToTrash);
archiveRouter.post('/trash/restore/:id', authenticate, authorizate(1), archiveController.restoreFromTrash);
archiveRouter.delete('/trash/:id', authenticate, authorizate(0), archiveController.permanentlyDelete);
archiveRouter.get('/trash/get/all', authenticate, authorizate(2), archiveController.getTrashArchives);

export default archiveRouter;
