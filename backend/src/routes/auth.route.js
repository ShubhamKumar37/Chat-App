import { Router } from "express";
import { validateSchema } from "../validators/validateSchema.validator.js";
import { loginSchema, resetPasswordSchema, signupSchema } from "../validators/auth.validator.js";
import Joi from "joi";
import { getUserData, login, logout, resetPassword, sendOtp, signup } from "../controllers/auth.controller.js";
import { authToken } from "../middlewares/authToken.middleware.js";

const route = Router();

route.put("/logout", logout);
route.get("/user-data", authToken, getUserData);
route.post("/login", validateSchema(loginSchema), login);
route.post("/signup", validateSchema(signupSchema), signup);
route.put("/reset-password", validateSchema(resetPasswordSchema), resetPassword);
route.post("/send-otp", validateSchema(Joi.object({ email: Joi.string().email().required() })), sendOtp);

export default route;