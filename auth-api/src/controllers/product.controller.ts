import { Request, Response } from 'express';
import { ProductModel } from '../models/product.js';
import AppError from '../handle/appError.js';
import asyncHandler from "express-async-handler";

export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description, price, inStock, category, tags } = req.body;

    // 1. Manually trigger your AppError if required fields are missing
    if (!name || !price) {
      throw new AppError('Name and price are required to create a product.', 400);
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