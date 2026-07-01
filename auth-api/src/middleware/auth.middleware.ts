import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../handle/appError.js";

// 1. Define the structure of your decoded JWT
export interface DecodedToken {
  id: string;
  role?: string;
  // add any other fields you included when signing the token
}

// 2. Augment the Express Request interface so TypeScript recognizes 'req.user'
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      // Pass directly to next() rather than throwing to avoid unnecessary catch block execution
      return next(new AppError("Not authenticated", 401)); 
    }

    // 3. Cast to your specific interface instead of 'any'
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as DecodedToken;

    req.user = decoded;

    next();
  } catch (error) {
    // You can also add specific checks here like if (error.name === 'TokenExpiredError')
    next(new AppError("Invalid or expired token", 401));
  }
};