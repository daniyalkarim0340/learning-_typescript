import { v2 as cloudinary } from 'cloudinary';

// 1. Configure Cloudinary with your credentials (add these to your .env file!)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Helper function to upload a file buffer directly to Cloudinary
export const uploadToCloudinary = (fileBuffer: Buffer, folderName: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Write the file buffer to the Cloudinary stream
    uploadStream.end(fileBuffer);
  });
};

export default cloudinary;