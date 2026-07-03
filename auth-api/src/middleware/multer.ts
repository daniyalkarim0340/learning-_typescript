import multer from 'multer';
import { Request } from 'express';
import AppError from '../handle/appError.js';

// 1. Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// 2. Filter files to ensure only images are allowed
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400) as any, false); // Reject it
  }
};

// 3. Initialize multer with size limits (e.g., max 5MB per file)
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});