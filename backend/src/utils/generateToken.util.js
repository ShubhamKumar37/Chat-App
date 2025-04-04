import jwt from "jsonwebtoken";

export const generateToken = async (id, res) => {
    const token = jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });
    return token;
};
