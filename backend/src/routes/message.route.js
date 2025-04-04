import { Router } from "express";
import { authToken } from "../middlewares/authToken.middleware.js";
import { getAllMessages, getAllUsers, sendMessage, sendMessageFile } from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const route = Router();

route.use(authToken);

route.get("/users", getAllUsers);
route.get("/:id", getAllMessages);
route.post("/messge-file/:id", upload.single("messageFile"), sendMessageFile);
route.post("/message/:id", sendMessage);

export default route;