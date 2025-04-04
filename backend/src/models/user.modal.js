import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    if (!this.profilePic) {
        this.profilePic = `https://api.dicebear.com/5.x/initials/svg?seed=${this.name}`;
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.models.User || mongoose.model("User", userSchema);
