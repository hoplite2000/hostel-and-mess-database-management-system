import asyncHandler from "express-async-handler";
import Employee from "../models/employeemodel.js";
import User from "../models/usermodel.js";

const getEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find({});
  
    res.json(employees);
});

const getEmployeebyId = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404);
      throw new Error("Employee not found");
    }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    const user = User.find({ id: employee.staffid });
    await user.remove();
    await employee.remove();
    res.json({ messsage: 'Employee Deleted '});
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

const updateEmployee = asyncHandler (async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {

      if(req.body.isadmin && req.body.isadmin !== employee.isadmin){
        await User.findOneAndUpdate({name: employee.name}, {isadmin: req.body.isadmin});
      }

      if(req.body.name && req.body.name !== employee.name){
        await User.findOneAndUpdate({name: employee.name}, {name: req.body.name});
      }

      employee.name = req.body.name || employee.name;
      employee.staffid = req.body.staffid || employee.staffid;
      employee.image = req.body.image || employee.image;
      employee.dob = req.body.dob || employee.dob;
      employee.idproof = req.body.idproof || employee.idproof;
      employee.contact = req.body.contact || employee.contact;
      employee.email = req.body.email || employee.email;
      employee.address = req.body.address || employee.address;
      employee.bloodgrp = req.body.bloodgrp || employee.bloodgrp;
      employee.role = req.body.role || employee.role;
      employee.isadmin = req.body.isadmin || employee.isadmin;

      const updatedemployee = await employee.save();
      res.json(updatedemployee);

  } else {
      res.status(404);
      throw new Error("Employee not found");
  }
});

export { getEmployeebyId, getEmployees, deleteEmployee, updateEmployee }