import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/user.model.js";
import AppError from "../handle/appError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";
import { setRefreshTokenCookie } from "../utils/cookies.js";
import bcrypt from "bcrypt";

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


export const LoginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  // 2. Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // 3. Check password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  // 4. Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // 5. Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  // 6. Set ONLY refresh token in cookie
  setRefreshTokenCookie(res, refreshToken);

  // 7. Send response (NO refresh token here)
  return res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});