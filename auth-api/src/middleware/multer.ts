import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import AppError from '../handle/appError.js';

// 1. Use memory storage to preserve buffers for Cloudinary
const storage = multer.memoryStorage();

// 2. Filter files to ensure only images are allowed
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  console.log("\n=== Multer File Filter Triggered ===");
  console.log("Field Name:   ", file.fieldname);
  console.log("File Name:    ", file.originalname);
  console.log("Mime Type:    ", file.mimetype);

  if (file.mimetype.startsWith('image/')) {
    console.log("➔ Filter Result: ACCEPTED ✅");
    console.log("===================================\n");
    cb(null, true);
  } else {
    console.error("➔ Filter Result: REJECTED ❌ (Invalid file type)");
    console.log("===================================\n");
    
    // Casted to 'any' to cleanly bypass minor structural typing differences between standard Errors and custom AppErrors in Multer types
    cb(new AppError('Not an image! Please upload only images.', 400) as any, false);
  }
};

// 3. Initialize multer with memory storage and strict size limits
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});