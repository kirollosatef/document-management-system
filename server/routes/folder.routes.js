import folderController from '../controllers/folder.controller.js';
import { Router } from 'express';

const folderRouter = Router();

folderRouter.post('/', folderController.create);
folderRouter.get('/', folderController.list);
folderRouter.get('/:id', folderController.get);
folderRouter.put('/:id', folderController.update);
folderRouter.delete('/:id', folderController.remove);

export default folderRouter;
