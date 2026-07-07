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

    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .positive("Price must be greater than 0"),

    inStock: z.boolean().optional().default(true),

    category: z
      .string()
      .trim()
      .min(2, "Category must be at least 2 characters")
      .max(50, "Category cannot exceed 50 characters")
      .optional(),

    tags: z.array(z.string().trim()).default([]),

    images: z
      .array(
        z.object({
          publicUrl: z
            .string()
            .url("Public URL must be a valid URL"),

          privateUrl: z
            .string()
            .url("Private URL must be a valid URL"),
        })
      )
      .default([]),
  })
  .strict();

export type ProductInput = z.infer<typeof productValidation>;