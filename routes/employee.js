const express = require("express");
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
  getEmployee,
} = require("../controller/employee.controller");
const { validateQuery, validateAccessToken } = require("../Middleware");

const router = express.Router();

const requireQuery = validateQuery(true);

router.post("/create", createEmployee);
router.get("/", validateAccessToken, getEmployees);
router.get("/department", validateAccessToken, requireQuery, getEmployeesByDepartment);
router.get("/:employeeId", validateAccessToken, getEmployee);
router.put("/:employeeId", validateAccessToken, updateEmployee);
router.delete("/:employeeId", validateAccessToken, deleteEmployee);

module.exports = router;
