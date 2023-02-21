const express = require("express");
const departmentController = require("../../controllers/department.controller");
const departmentRouter = express.Router();

departmentRouter.get("/", departmentController.getDepartments);
departmentRouter.get("/:id", departmentController.getDepartmentsById);
departmentRouter.post("/", departmentController.createDepartment);
departmentRouter.delete("/:id", departmentController.deleteDepartment);

module.exports = departmentRouter;
