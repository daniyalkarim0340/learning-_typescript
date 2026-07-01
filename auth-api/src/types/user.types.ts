import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  createdAt: Date;
  updatedAt: Date;
}