import express from "express";
import authController from "../controller/Auth.js";
const route = express.Router();

route.post("/", authController.auth);
route.post("/check-old-password", authController.checkOldPassword);
route.post("/change-password", authController.changePassword);
export default route;
