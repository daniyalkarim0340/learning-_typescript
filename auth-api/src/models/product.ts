import mongoose, { Schema, Document } from 'mongoose';

// 1. Define a TypeScript interface for the nested image structure
export interface IProductImage {
  publicUrl: string;
  privateUrl: string;
}

// 2. Extend 'Document' and include the new images array
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  category?: string;
  tags: string[];
  images: IProductImage[]; // Added: Array of image objects
}

// 3. Create the actual database schema
const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  category: { type: String, required: false },
  tags: { type: [String], default: [] },
  
  // Added: Sub-document array for storing product images
  images: [
    {
      publicUrl: { type: String, required: true },
      privateUrl: { type: String, required: true }
    }
  ]
}, {
  timestamps: true // Automatically adds createdAt and updatedAt dates!
});

// 4. Export the model
export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);