import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();



// 2. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 3. File Upload Helper
export const uploadToCloudinary = (fileBuffer: Buffer, folderName: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    console.log(`[Cloudinary] Initializing upload stream for folder: ${folderName}`);
    
    if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
      console.error("[Cloudinary] Error: Invalid file buffer provided.");
      return reject(new Error("Invalid file buffer"));
    }
    
    console.log(`[Cloudinary] Buffer size confirmed: ${fileBuffer.length} bytes`);

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error("[Cloudinary] Stream Upload Failed:", error);
          return reject(error);
        }
        if (!result) {
          console.error("[Cloudinary] Stream Upload Failed: Empty result object returned.");
          return reject(new Error("Cloudinary returned an empty response."));
        }
        
        console.log("[Cloudinary] Upload Successful! URL:", result.secure_url);
        resolve(result);
      }
    );

    // Execute the stream
    uploadStream.end(fileBuffer);
  });
};

export default cloudinary;