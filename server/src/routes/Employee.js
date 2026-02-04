import express from "express";
import EmployeeController from "../controller/Employee.js";

const route = express.Router();

route.get("/", EmployeeController.getAllCandidate);
route.post("/", EmployeeController.createEmployee);

export default route;
