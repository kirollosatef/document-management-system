import { Router } from 'express';
import fileController from '../controllers/file.controller.js';
import authenticate from '../middlewares/authenticate.js';
import authorizate from '../middlewares/authorizate.js';
import multer from 'multer';

const fileRouter = Router();
const upload = multer().single('file');
const uploads = multer().array('files');

fileRouter.post('/:archiveId', authenticate, authorizate(1), upload, fileController.create);
fileRouter.post('/multiple/:archiveId', authenticate, authorizate(1), uploads, fileController.createMultiple);
fileRouter.get('/:id', authenticate, authorizate(2), fileController.get);
fileRouter.get('/', authenticate, authorizate(2), fileController.list);
fileRouter.put('/:id', authenticate, authorizate(1), fileController.update);
fileRouter.delete('/:id', authenticate, authorizate(0), fileController.remove);
fileRouter.get('/download/:id', fileController.download);
fileRouter.get('/print/:id/:archiveId', fileController.print);

export default fileRouter;
