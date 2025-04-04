import { ApiError, asyncHandler } from "../utils/index.js";
import jwt from "jsonwebtoken";


export const authToken = asyncHandler(async (req, _, next) => {
    let token = req.cookies.token || req.body;
    if (req.headers && req.headers.authorization) token = req.headers.authorization.split(" ")[1];
    console.log("This is the token = ", token);
    if (!token) throw new ApiError(401, "Token not provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) throw new ApiError(401, "Unauthorized");

    req.user = decoded;
    next();
});