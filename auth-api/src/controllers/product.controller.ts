import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../models/product.js';
import AppError from '../handle/appError.js';
import asyncHandler from "express-async-handler";
import { uploadToCloudinary } from '../config/cloudinary.js';

// 1. CREATE PRODUCT (With Cloudinary File Upload Integration)
export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Extract standard text fields from the request body
    const { name, description, price, inStock, category, tags } = req.body;

    // Validate required text fields
    if (!name || !price) {
      return next(new AppError('Name and price are required to create a product.', 400));
    }

    // Initialize an empty array to collect uploaded image object metadata
    const uploadedImages = [];

    // Check if files were intercepted and loaded into memory by the Multer middleware
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files as Express.Multer.File[]) {
        // Stream the file buffer up to Cloudinary inside a 'products' folder
        const cloudinaryResult = await uploadToCloudinary(file.buffer, 'products');
        
        // Structure the output URLs to match your explicit IProduct schema design
        uploadedImages.push({
          publicUrl: cloudinaryResult.secure_url, // For client-side UI rendering
          privateUrl: cloudinaryResult.public_id  // Keep track of asset IDs for future deletions
        });
      }
    }

    // Instantiate and populate your MongoDB document setup
    const newProduct = new ProductModel({
      name,
      description,
      price,
      inStock,
      category,
      tags,
      images: uploadedImages // Assign the dynamically collected array
    });

    // Write validation checkpoints directly to the DB collection
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully with cloud images!',
      product: savedProduct
    });
  }
);

// 2. DELETE PRODUCT
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
 
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return next(new AppError('No product found with that ID.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      deletedProduct: { id: deletedProduct._id, name: deletedProduct.name }
    });
  }
);

// 3. UPDATE PRODUCT
export const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    // 1. Check if the user is uploading new images during this update
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const uploadedImages = [];

      // Stream the new files to Cloudinary
      for (const file of req.files as Express.Multer.File[]) {
        const cloudinaryResult = await uploadToCloudinary(file.buffer, 'products');
        uploadedImages.push({
          publicUrl: cloudinaryResult.secure_url,
          privateUrl: cloudinaryResult.public_id
        });
      }

      // 2. Inject the new cloud images array into req.body so Mongoose updates it
      req.body.images = uploadedImages;
    }

    // 3. Update the document in MongoDB
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return next(new AppError('No product found with that ID.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      product: updatedProduct
    });
  }
);

// 4. GET ALL PRODUCTS
export const getAllProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const products = await ProductModel.find({});

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  }
);