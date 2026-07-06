import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

/**
 * Express middleware to validate request bodies against a Zod schema.
 * Overwrites req.body with the parsed/cleaned data if successful.
 */
export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      // .parse() validates the data and strips out any unexpected fields
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.flatten().fieldErrors,
        });
        return;
      }

      // Pass non-Zod errors to your global Express error handler
      next(error);
    }
  };