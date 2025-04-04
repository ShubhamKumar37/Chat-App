import { v2 } from "cloudinary";
import fs from "fs";

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export const getFilePublicId = (url) => {
    if (!url || !url.includes("cloudinary")) return null;

    const parts = url.split("/").at(-1).split(".")[0];
    return process.env.CLOUDINARY_FOLDER + "/" + parts;
};

export const cloudinaryUpload = async (filePath) => {
    try {
        const response = await v2.uploader.upload(filePath, { resource_type: "auto", folder: process.env.CLOUDINARY_FOLDER, quality: "90" });
        console.log("This is the cloudinary upload response :: ", response);
        return response.secure_url;
    }
    catch (error) {
        console.log("This is the error faced while uploading :: ", error);
        return null;
    }
    finally {
        fs.unlinkSync(filePath);
    }
};

export const cloudinaryDelete = async (publicId, resource_type = "image") => {
    try {
        const response = await v2.uploader.destroy(publicId, { resource_type: resource_type });
        console.log("This is the cloudinary delete response :: ", response);
    }
    catch (error) {
        console.log("This is the error faced while deleting :: ", error);
        return null;
    }
};

export const cloudinaryUpdate = async (filePath, publicId, resource_type = "image") => {
    try {
        const response = await v2.uploader.upload(filePath, { public_id: publicId, resource_type: resource_type, overwrite: true });
        console.log("This is the response of cloudinary update :: ", response);

        return response;
    }
    catch (error) {
        console.log("This error occur while updating :: ", error);
    }
    finally {
        fs.unlinkSync(filePath);
    }
};