import { Schema, model, Document } from "mongoose";

// 1. Define the TypeScript interface for the Category document
export interface ICategory extends Document {
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Create the Mongoose schema matching the interface
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
      trim: true,
    },
  },
  {
    // Automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true, 
  }
);

// 3. Export the model
export const Category = model<ICategory>("Category", categorySchema);