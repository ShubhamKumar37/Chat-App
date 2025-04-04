import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { ErrorHandler } from './middlewares/index.js';
import { authRoute, messageRoute, userRoute } from './routes/index.js';
import { dbConnect } from './config/dbConnect.config.js';
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();

dbConnect();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"]
}));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
app.use(ErrorHandler);

app.get("/", (_, res) => {
    res.send("Hi this is a backend server ");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on this url http://localhost:${process.env.PORT}`);
});
