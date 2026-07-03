import mongoose, { Schema, Document } from 'mongoose';

// 1. We extend 'Document' so Mongoose knows this is a database entry
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  category?: string;
  tags: string[];
}

// 2. We create the actual database schema
const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  category: { type: String, required: false },
  tags: { type: [String], default: [] }
}, {
  timestamps: true // This automatically adds createdAt and updatedAt dates!
});

// 3. We export the model so we can use it in our controllers
export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);