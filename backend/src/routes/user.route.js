import { Router } from "express";
import { authToken } from "../middlewares/authToken.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { updateUser, updateUserProfilePic } from "../controllers/user.controller.js";

const route = Router();

route.use(authToken);

route.put("/update-pic", upload.single("userImage"), updateUserProfilePic);
route.put("/update-profile", updateUser);

export default route;