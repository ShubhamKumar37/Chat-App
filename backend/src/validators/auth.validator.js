import joi from "joi";

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    otp: joi.string().length(6).required(),
    name: joi.string().min(3).required(),
});

const resetPasswordSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    otp: joi.string().length(6).required(),
});

export { loginSchema, signupSchema, resetPasswordSchema };