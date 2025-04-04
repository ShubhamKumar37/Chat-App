import { ApiError, asyncHandler } from "../utils/index.js";
import jwt from "jsonwebtoken";


export const authToken = asyncHandler(async (req, _, next) => {
    const token = req.cookies.token || req.body || req.header("Authorization").replace("Bearer ", "");
    if (!token) throw new ApiError(401, "Token not provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) throw new ApiError(401, "Unauthorized");

    req.user = decoded;
    next();
});