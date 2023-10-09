const EmployeeService = require("../services/employee");

const createEmployee = async (req, res, next) => {
  const { firstname, lastname, email, department } = req.body;
  try {
    const employee = await EmployeeService.create(
      firstname,
      lastname,
      email,
      department
    );

    return res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ error: "Validation error", details: error.message });
    } else if (error.message === "Employee already exists") {
      res.status(409).json({ error: error.message });
    } else if (error.message === "All fields must be filled") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
    next(error);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    const employees = await EmployeeService.getEmployees();

    return res.status(200).json({
      message: "All employees fetched successfully",
      totalNumberOfEmployees: employees?.length,
      employees,
    });
  } catch (error) {
    console.error(error);
    if (error.message === "No employees found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
    next(error);
  }
};

const getEmployee = async (req, res, next) => {
  const employeeId = req.params.employeeId;

  try {
    const employee = await EmployeeService.getEmployeeById(employeeId);

    return res.status(200).json({
      message: "Success",
      employee,
    });
  } catch (error) {
    console.error(error);
    if (error.message === "No employee found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  const { employeeId } = req.params;

  try {
    const data = await EmployeeService.updateEmployee(req.body, employeeId);
    console.log("Updated Employee", data);

    return res
      .status(200)
      .json({ message: "Employee info updated successfully", data });
  } catch (error) {
    console.error(error);
    if (error.message === "No employees found") {
      res.status(404).json({ error: "Unknown employee Id" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  const { employeeId } = req.params;
  try {
    const response = await EmployeeService.deleteEmployee(employeeId);

    return res
      .status(200)
      .json({ message: "Employee deleted successfully", response });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getEmployeesByDepartment = async (req, res, next) => {
  const deptName = req.query.name;
  console.log("Dept name", deptName);
  
  try {
    const employees = await EmployeeService.getEmployeesByDepartment(deptName);

    return res.status(200).json({
      message: `Fetched ${deptName} employee(s) successfully`,
      totalNumberOfEmployees: employees?.length,
      employees,
    });

  } catch (error) {
    console.error(error);
    if (error.message === "No employees found") {
      res.status(404).json({ error: error.message });
    } else if (error.message === "Department does not exist") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
    next(error);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
  getEmployee,
};
