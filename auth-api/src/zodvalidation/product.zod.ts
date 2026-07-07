import { z } from "zod";

export const productValidation = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Product name must be at least 2 characters")
      .max(100, "Product name cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description cannot exceed 1000 characters"),

    // ✅ FIX 1: Use z.coerce.number to turn the string '50' into a real number
    price: z.coerce
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .positive("Price must be greater than 0"),

    // ✅ FIX 2: Preprocess instead of z.coerce.boolean 
    // (JavaScript converts the string "false" to TRUE, so we manually map it here)
    inStock: z
      .preprocess((val) => {
        if (val === "true" || val === "1") return true;
        if (val === "false" || val === "0") return false;
        return val;
      }, z.boolean())
      .optional()
      .default(true),

    category: z
      .string()
      .trim()
      .min(2, "Category must be at least 2 characters")
      .max(50, "Category cannot exceed 50 characters")
      .optional(),

    // ✅ FIX 3: Preprocess tags to handle both single items and comma-separated text
    tags: z
      .preprocess((val) => {
        if (typeof val === "string") {
          if (val.trim() === "") return [];
          return val.includes(",") 
            ? val.split(",").map((t) => t.trim()) 
            : [val.trim()];
        }
        return val;
      }, z.array(z.string().trim()))
      .default([]),

    // ⚠️ CRITICAL NOTE ON IMAGES:
    // Because Multer puts files into `req.files` (not `req.body`), your validation 
    // middleware won't see them yet. Leaving this as a default empty array is safe 
    // for validation, but you will populate these URLs later in your controller 
    // after uploading them to Cloudinary/S3.
    images: z
      .array(
        z.object({
          publicUrl: z.string().url("Public URL must be a valid URL"),
          privateUrl: z.string().url("Private URL must be a valid URL"),
        })
      )
      .default([]),
  })
  .strict();

export type ProductInput = z.infer<typeof productValidation>;