import { User } from "../models/user.modal.js";
import { ApiError, ApiResponse, asyncHandler, cloudinaryUpdate, cloudinaryUpload, getFilePublicId } from "../utils/index.js";



export const updateUserProfilePic = asyncHandler(async (req, res) => {
    const { userImage } = req.file;
    const { _id } = req.user;

    if (!userImage) throw new ApiError(400, "No image provided");

    const userExist = await User.findById(_id).select("-password");
    if (!userExist) throw new ApiError(404, "User does not exist");

    const publicId = getFilePublicId(userExist.userImage);
    if (!publicId) {
        const response = await cloudinaryUpload(userImage);
        userExist.userImage = response.secure_url;
        await userExist.save({ new: true });
    }
    else await cloudinaryUpdate(userImage, publicId);

    return res.status(200).json(new ApiResponse(200, "User image updated successfully", userExist));
});

export const updateUser = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const { _id } = req.body;

    if (!name) throw new ApiError(400, "No name provided");

    const userExist = await User.findById(_id).select("-password");
    if (!userExist) throw new ApiError(404, "User does not exist");

    userExist.name = name;
    await userExist.save({ new: true });

    return res.status(200).json(new ApiResponse(200, "User updated successfully", userExist));
});

export const deleteUser = asyncHandler(async (req, res) => { });