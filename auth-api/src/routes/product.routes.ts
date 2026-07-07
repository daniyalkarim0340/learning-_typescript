import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js';
import { upload } from '../middleware/multer.js'; 
import { validate } from '../middleware/validate.js';
import { productValidation } from '../zodvalidation/product.zod.js';

const ProductRouter = Router();

// ✅ FIX: Put upload FIRST so it populates req.body before validation runs
ProductRouter.post(
  '/create', 
  upload.array('images', 5), 
  validate(productValidation), 
  createProduct
);

ProductRouter.patch(
  '/:id', 
  upload.array('images', 5), 
  validate(productValidation), 
  updateProduct
);

ProductRouter.delete('/:id', deleteProduct);
ProductRouter.get('/', getAllProducts);

export default ProductRouter;