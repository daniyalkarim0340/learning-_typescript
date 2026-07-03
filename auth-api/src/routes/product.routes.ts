import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js';
import { upload } from '../middleware/multer.js'; 

const ProductRouter = Router();

// Pass multer middleware to BOTH create and update routes
ProductRouter.post('/create', upload.array('images', 5), createProduct);
ProductRouter.patch('/:id', upload.array('images', 5), updateProduct); // Fixed here!

ProductRouter.delete('/:id', deleteProduct);
ProductRouter.get('/', getAllProducts);

export default ProductRouter;