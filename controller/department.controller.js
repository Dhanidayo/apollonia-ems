const { validationResult } = require("express-validator");
const DepartmentService = require("../services/department");

const createDepartment = async (req, res, next) => {
  const { name, description } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const department = await DepartmentService.create(name, description);

    return res
      .status(201)
      .json({ message: "Department created successfully", department });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ error: "Validation error", details: error.message });
    } else if (error.message === "Department already exists") {
      res.status(409).json({ error: error.message });
    } else if (error.message === "All fields must be filled") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
    next(error);
  }
};

const getDepartments = async (req, res, next) => {
  try {
    const departments = await DepartmentService.getDepartments();
    return res
      .status(200)
      .json({ message: "Departments fetched successfully", departments });
  } catch (error) {
    console.error(error);
    if (error.message === "No departments found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
    next(error);
  }
};

const addNewField = async (req, res) => {
  try {
    const docWithNewField = await DepartmentService.addMembersField();

    return res.status(200).json({ docWithNewField });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createDepartment, getDepartments, addNewField };
