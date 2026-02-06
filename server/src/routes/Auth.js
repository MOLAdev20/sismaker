import express from "express";
import authController from "../controller/Auth.js";
const route = express.Router();

route.post("/", authController.auth);
export default route;
