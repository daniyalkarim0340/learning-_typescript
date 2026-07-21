import { Request, Response, NextFunction } from "express";
import AsyncHandler from "express-async-handler";
import { Category } from "../models/category.model.js";
import AppError from "../handle/appError.js";

// @desc    Create a new product/menu category
// @route   POST /api/categories
// @access  Private/Admin 
export const createCategory = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, description } = req.body;

  // 1. Validation check
  if (!name || !description) {
    return next(new AppError("Both category name and description are required", 400));
  }

  // 2. Prevent duplicate categories (case-insensitive)
  const existingCategory = await Category.findOne({
    name: { $regex: `^${name.trim()}$`, $options: "i" },
  });

  if (existingCategory) {
    return next(new AppError("A category with this name already exists", 400));
  }

  // 3. Create the new category
  const newCategory = await Category.create({
    name: name.trim(),
    description: description.trim(),
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category: newCategory,
  });
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getAllCategories = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const categories = await Category.find();

  if (!categories || categories.length === 0) {
    return next(new AppError("No categories found", 404));
  }

  res.status(200).json({
    success: true,
    results: categories.length,
    categories,
  });
});

// @desc    Get a single category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return next(new AppError("No category found with that ID.", 404));
  }

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});