import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Set your Cloudinary credentials
const cloudinaryCredentials = {
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
};

cloudinary.config({
  cloud_name: cloudinaryCredentials.cloudName,
  api_key: cloudinaryCredentials.apiKey,
  api_secret: cloudinaryCredentials.apiSecret,
});

export const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "hotelImages",
    });
    // console.log(res.secure_url);
    fs.unlinkSync(localFilePath);
    return res.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(error);

    return null;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const res = await cloudinary.uploader.destroy(publicId);
    console.log(res);
    return true;
  } catch (error) {
    console.log("Failed to delete", error);
    return error;
  }
};

export const extractPublicId = (imageUrl) => {
  const publicIdMatch = imageUrl.match(/\/v\d+\/(.+?)\.\w+$/);
  if (publicIdMatch) {
    return publicIdMatch[1];
  } else {
    console.error(`Invalid secure URL format for image: ${imageUrl}`);
    return null;
  }
};
