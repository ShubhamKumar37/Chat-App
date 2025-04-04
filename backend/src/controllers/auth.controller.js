import { OTP } from "../models/otp.modal.js";
import { User } from "../models/user.modal.js";
import { ApiError, ApiResponse, asyncHandler, generateToken } from "../utils/index.js";

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

export const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const otp = generateOtp();

    const response = await OTP.create({
        email,
        otp: otp.toString()
    });

    if (!response) throw new ApiError(400, "No OTP generate properly");

    return res.status(200).json(new ApiResponse(200, "OTP send successfully, check you spam if not recieved"));
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) throw new ApiError(404, "User does not exist");

    if (!(await userExist.isPasswordCorrect(password))) throw new ApiError(400, "Password is incorrect");

    await generateToken(userExist._id, res);

    userExist.password = undefined;

    return res.status(200).json(new ApiResponse(200, "User loggedIn successfully", userExist));
});

export const signup = asyncHandler(async (req, res) => {
    const { email, name, password, otp } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) throw new ApiError(400, "User already exist");

    const otpExist = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!otpExist) throw new ApiError(404, "OTP expired");
    if (otpExist.otp !== otp) throw new ApiError(400, "OTP is incorrect");

    const user = await User.create({ email, password, name });
    await generateToken(user._id, res);
    user.password = undefined;

    return res.status(200).json(new ApiResponse(200, "User created successfully", user));
});

export const getUserData = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select("-password");
    return res.status(200).json(new ApiResponse(200, "User data found successfully", user));
})

export const logout = asyncHandler(async (_, res) => {
    return res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" }).status(200).json(new ApiResponse(200, "User loggedOut successfully"));
});

export const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) throw new ApiError(404, "User does not exist");

    const otpExist = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!otpExist) throw new ApiError(404, "OTP expired");
    if (otpExist.otp !== otp) throw new ApiError(400, "OTP is incorrect");

    userExist.password = password;
    await userExist.save({ new: true });

    return res.status(200).json(new ApiResponse(200, "Password reset successfully"));
});