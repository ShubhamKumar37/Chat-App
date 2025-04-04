import mongoose from "mongoose";
import { mailSender } from "../utils/index.js";

const OTPSchema = new mongoose.Schema({
    otp: { type: String, required: true },
    email: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, expires: 20 * 60 }
}, { timestamps: true });

async function sendVerification(email, otp) {
    try {
        await mailSender(email, "This is your OTP", otp);
    }
    catch (error) {
        console.log(error);
    }
}

OTPSchema.pre("save", async function (next) {
    await sendVerification(this.email, this.otp);
    next();
});


export const OTP = mongoose.models.OTP || mongoose.model("OTP", OTPSchema);