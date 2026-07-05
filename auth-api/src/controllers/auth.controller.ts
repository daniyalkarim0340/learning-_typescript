import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import AppError from "../handle/appError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";
import { setRefreshTokenCookie } from "../utils/cookies.js";

// Custom payload matching your JWT design
interface CustomJwtPayload extends jwt.JwtPayload {
  _id: string;
}

// ==========================================
// 1. USER REGISTRATION
// ==========================================
export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  // Password auto-hashed via Mongoose pre-save middleware
  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

// ==========================================
// 2. USER LOGIN
// ==========================================
// Renamed to camelCase for codebase uniformity
export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  // Explicitly selecting password if your schema has it hidden by default
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  // Sets HttpOnly, Secure, SameSite refresh cookie
  setRefreshTokenCookie(res, refreshToken);

  res.status(200).json({
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

// ==========================================
// 3. REFRESH ACCESS TOKEN
// ==========================================
export const refreshAccessToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new AppError("Unauthorized request: Missing token", 401);
  }

  let decodedToken: CustomJwtPayload;
  try {
    // Synchronous execution block to cleanly map jsonwebtoken errors into your AppError handling
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as CustomJwtPayload;
  } catch (error) {
    throw new AppError("Refresh token is invalid or expired", 401);
  }

  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new AppError("Invalid refresh token user", 401);
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new AppError("Refresh token is expired or already used", 401);
  }

  // Unified token generation using your imported utility function
  const accessToken = generateAccessToken(user);

  res.status(200).json({
    success: true,
    accessToken,
    message: "Access token refreshed successfully",
  });
});


// Add this export to src/controllers/auth.controller.ts

export const logoutUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // 1. req.user is populated by your authMiddleware
  const userId = req.user?._id || req.user?.id;

  if (!userId) {
    throw new AppError("Unauthorized logout request", 401);
  }

  // 2. Clear the refresh token in the database so it can never be reused
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1 // Removes the field from the Mongoose document entirely
      }
    },
    { new: true }
  );

  // 3. Clear cookies with matching production configurations
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  res.status(200).clearCookie("accessToken", cookieOptions).clearCookie("refreshToken", cookieOptions)
    .json({
      success: true,
      message: "User logged out successfully",
    });
});