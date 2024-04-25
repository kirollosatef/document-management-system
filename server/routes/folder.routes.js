import { Router } from 'express';
import folderController from '../controllers/folder.controller.js';
import authenticate from '../middlewares/authenticate.js';
import authorizate from '../middlewares/authorizate.js';

const folderRouter = Router();

folderRouter.post('/', authenticate, authorizate(1), folderController.create);
folderRouter.post('/:id', authenticate, authorizate(1), folderController.addSubFolder);
folderRouter.get('/', authenticate, authorizate(2), folderController.list);
folderRouter.get('/:id', authenticate, authorizate(2), folderController.get);
folderRouter.put('/:id', authenticate, authorizate(1), folderController.update);
folderRouter.delete('/:id', authenticate, authorizate(0), folderController.remove);
folderRouter.post('/search/sub-folder', authenticate, authorizate(2), folderController.searchSubFolder);

export default folderRouter;
