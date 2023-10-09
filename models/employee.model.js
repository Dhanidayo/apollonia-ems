const mongoose = require("mongoose");
const employeeSchema = require("./employee.schema");

const EmployeeModel = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;
