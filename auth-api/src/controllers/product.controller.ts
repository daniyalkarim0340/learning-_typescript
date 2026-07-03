import { Request, Response } from 'express';
import { ProductModel } from '../models/product.js';
import AppError from '../handle/appError.js';
import asyncHandler from "express-async-handler";

export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description, price, inStock, category, tags } = req.body;

    // 1. Manually trigger your AppError if required fields are missing
    if (!name || !price) {
      return next(new AppError('Name and price are required to create a product.', 400));
    }

    // 2. Create the new product
    const newProduct = new ProductModel({
      name,
      description,
      price,
      inStock,
      category,
      tags
    });

    // 3. Save it to the database
    // If Mongoose throws an error here, the asyncHandler catches it automatically!
    const savedProduct = await newProduct.save();

    // 4. Send success response
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      product: savedProduct
    });
  }
);


export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1. Extract the ID from the URL parameters (e.g., /api/products/:id)
    const { id } = req.params;
 
    // 2. Look for the product and delete it from the database in one shot
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    // 3. If Mongoose returns null, it means that ID doesn't exist in the database
    if (!deletedProduct) {
      return next(new AppError('No product found with that ID.', 404));
    }

    // 4. Send back a 200 OK success response
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      deletedProduct: { id: deletedProduct._id, name: deletedProduct.name } // Sending brief confirmation data
    });
  }
);


export const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    // findByIdAndUpdate takes three arguments:
    // 1. The ID of the item to update
    // 2. The new data (req.body)
    // 3. Options: 
    //    'new: true' returns the freshly updated document instead of the old one
    //    'runValidators: true' forces Mongoose to validate the new data against your Schema rules
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // If no product matches the ID, trigger your custom 404 error
    if (!updatedProduct) {
      return next(new AppError('No product found with that ID.', 404));
    }

    // Send back a 200 OK success response with the updated data
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      product: updatedProduct
    });
  }
);