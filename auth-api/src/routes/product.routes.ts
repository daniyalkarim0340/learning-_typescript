import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js';

const ProductRouter = Router();

// This sets up a POST request. 
// When someone sends a POST request to this route, it triggers your controller.
ProductRouter.post('/create', createProduct);
ProductRouter.delete('/:id', deleteProduct);
ProductRouter.patch('/:id', updateProduct); 
ProductRouter.get('/', getAllProducts);// Triggers our update controller


export default ProductRouter;