import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/user.model.js";
import AppError from "../handle/appError.js";


export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // 1. Validation
  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  // 2. Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  // 3. Create user (password auto-hashed by pre("save"))
  const user = await User.create({
    name,
    email,
    password,
  });

  // 4. Response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
});