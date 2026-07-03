import { Router } from 'express';
import { createProduct, deleteProduct } from '../controllers/product.controller.js';

const ProductRouter = Router();

// This sets up a POST request. 
// When someone sends a POST request to this route, it triggers your controller.
ProductRouter.post('/', createProduct);
ProductRouter.delete('/:id', deleteProduct);

export default ProductRouter;