import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // File system module for file management
import dotenv from "dotenv";
dotenv.config();  // Load environment variables from the .env file



// Log the environment variables to check if they are set
console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET);

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Log the file path for debugging
        console.log("Attempting to upload file to Cloudinary. File path:", localFilePath);

        // Check if the file path exists before attempting to upload
        if (!localFilePath) {
            console.error("Error: No file path provided.");
            return null;
        }

        // Check if the file actually exists at the specified path
        if (!fs.existsSync(localFilePath)) {
            console.error("Error: File does not exist at the given path:", localFilePath);
            return null;
        }

        // Proceed with the file upload to Cloudinary
        console.log("Uploading file to Cloudinary...");
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically detect the file type (image, video, etc.)
        });

        // Log the response to confirm the upload
        console.log("File uploaded successfully. Cloudinary response:", response);

        // Remove the local file after successful upload
        fs.unlinkSync(localFilePath);
        console.log("Temporary local file deleted:", localFilePath);

        return response;

    } catch (error) {
        // Log the error for debugging
        console.error("Cloudinary upload failed with error:", error);

        // Attempt to clean up by deleting the local file even if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            console.log("Temporary local file deleted due to upload failure:", localFilePath);
        }

        return null;
    }
};

export { uploadOnCloudinary };
