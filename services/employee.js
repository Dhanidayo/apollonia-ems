const { STATIC_ACCESS_TOKEN } = require("../config");
const EmployeeModel = require("../models/employee.model");
const Utility = require("../utils");
const DepartmentService = require("./department");

class EmployeeService {
  static async create(firstname, lastname, email, department) {
    if (!firstname || !lastname || !email || !department) {
      throw Error("All fields must be filled");
    }

    const employeeExists = await EmployeeModel.find({ email, department });

    if (employeeExists.length > 0) {
      throw Error("Employee already exists");
    }

    const uniqueId = await Utility.generateUniqueID();
    const employeeId = `APL${uniqueId}`;
    const token = await Utility.createSalt(16);
    const access_token = `${STATIC_ACCESS_TOKEN}${token}`;

    const employee = await EmployeeModel.create({
      firstname,
      lastname,
      email,
      department,
      employeeId,
      access_token
    });

    return employee;
  }

  static async getEmployees() {
    const employees = await EmployeeModel.find().sort({ _id: -1 });

    if (employees.length === 0) {
      throw Error("No employees found");
    }

    return employees;
  }

  static async getEmployeeById(id) {
    const employee = await EmployeeModel.findOne({ employeeId: id });

    if (!employee) {
      throw Error("No employees found");
    }
    return employee;
  }

  static async updateEmployee(data, id) {
    const employee = await this.getEmployeeById(id);
    
    if (!employee) {
      throw Error("Unknown employee Id");
    }
    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      { employeeId: id },
      { $set: data },
      { new: true },
    );

    return updatedEmployee;
  }

  static async deleteEmployee(id) {
    const response = await EmployeeModel.deleteOne({ employeeId: id });
    console.log("Deleted", response);
    if (response.acknowledged === true) {
      return response;
    }
  }

  static async getEmployeesByDepartment(department) {
    const departmentList = await DepartmentService.getDepartments();

    if (departmentList) {
      const isDeptExists = departmentList.find(
        (dept) => department === dept.name
      );

      if (!isDeptExists) {
        throw Error("Department does not exist");
      }
      console.log("Department exists");
    }

    const employees = await EmployeeModel.find({ department: department });

    if (employees.length === 0) {
      throw Error("No employees found");
    }

    return employees;
  }
}

module.exports = EmployeeService;
