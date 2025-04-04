import { Message } from "../models/message.modal.js";
import { User } from "../models/user.modal.js";
import { ApiError, ApiResponse, asyncHandler, cloudinaryUpload } from "../utils/index.js";


export const getAllUsers = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const allUsers = await User.find({ _id: { $ne: _id } }).select("-password");

    return res.status(200).json(new ApiResponse(200, "Users found successfully", allUsers));
});

export const getAllMessages = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { chatUserId: id } = req.params;
    const { page = 1, limit = 30 } = req.query;
    const skip = (page - 1) * limit;

    const allMessages = await Message.find({
        $or: [
            { senderId: id, receiverId: _id },
            { recieverId: _id, recieverId: id }
        ],
    }).sort({ createdAt: -1 }).skip(skip).limit(limit);

    return res.status(200).json(new ApiResponse(200, "Messages found successfully", allMessages));
});

export const sendMessageFile = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { chatUserId: id } = req.params;
    const { messageFile } = req.file;
    const uploadUrl = await cloudinaryUpload(messageFile);

    const message = await Message.create({
        senderId: _id,
        receiverId: id,
        file: uploadUrl
    });

    return res.status(200).json(new ApiResponse(200, "Message sent successfully", message));
});

export const sendMessage = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { chatUserId: id } = req.params;

    const message = await Message.create({
        senderId: _id,
        receiverId: id,
        message: req.body.message
    });

    return res.status(200).json(new ApiResponse(200, "Message sent successfully", message));
});