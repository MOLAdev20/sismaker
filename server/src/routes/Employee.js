import express from "express";
import EmployeeController from "../controller/Employee.js";

const route = express.Router();

route.get("/", EmployeeController.getAllEmployee);
route.post("/", EmployeeController.createEmployee);
route.post("/validate/:type", EmployeeController.validateInput);
route.post("/edit/:id", EmployeeController.editEmployee);
route.get("/change-status/:id", EmployeeController.changeStatus);
route.get("/:id", EmployeeController.getEmployeeById);
route.delete("/:id", EmployeeController.deleteEmployee);

export default route;
