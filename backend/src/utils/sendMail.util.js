import nodemailer from "nodemailer";
import { ApiError } from "./index.js";


const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        if (!process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.MAIL_HOST) {
            throw new Error("Missing required environment variables for mail configuration");
        }

        const mailOptions = {
            from: `Chat App :: ${process.env.MAIL_USER}`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        }
        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;
    }
    catch (error) {
        console.error("Error occurred while sending the mail :: ", error);
        throw new ApiError(500, "There is issue in sending mail");
    }
}

export default mailSender;