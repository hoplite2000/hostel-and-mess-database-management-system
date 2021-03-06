import express from "express";
import { protect, admin } from "../middleware/authmiddleware.js";
const Employeerouter = express.Router();
import { getEmployeebyId, getEmployees, deleteEmployee, updateEmployee, addEmployee, searchEmployees } from "../controllers/employeecontroller.js";

Employeerouter.route('/').get(protect, admin, getEmployees).post(protect, admin, addEmployee);
Employeerouter.route('/search').post(protect, admin, searchEmployees);
Employeerouter.route('/:id').get(protect, admin, getEmployeebyId).put(protect, admin, updateEmployee).delete(protect, admin, deleteEmployee);

export default Employeerouter;
