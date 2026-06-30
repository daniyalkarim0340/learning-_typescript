import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../handle/appError.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new AppError("Not authenticated", 401);
    }

    // 2. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as any;

    // 3. Attach user to request
    req.user = decoded;

    // 4. Continue
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};