const express = require("express");
const { createDepartment, getDepartments, addNewField } = require("../controller/department.controller");

const router = express.Router();

router.post("/create", createDepartment);
router.get("/", getDepartments);
router.post("/add-field", addNewField);  //internal route

module.exports = router;