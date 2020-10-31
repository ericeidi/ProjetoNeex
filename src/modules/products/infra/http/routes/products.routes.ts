import { Router } from 'express';

import ProductsController from '../controller/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post('/', productsController.create);
productsRouter.get('/:id', productsController.showById);
productsRouter.get('/', productsController.show);

export default productsRouter;
