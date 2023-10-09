const DepartmentModel = require("../models/department.model");
const EmployeeModel = require("../models/employee.model");

class DepartmentService {
  static async create(name, description) {
    if (!name || !description) {
      throw Error("All fields must be filled");
    }

    const departmentExists = await DepartmentModel.find({ name });

    if (departmentExists.length > 0) {
      throw Error("Department already exists");
    }

    const department = await DepartmentModel.create({
      name,
      description,
    });

    return department;
  }

  static async getDepartments() {
    const departments = await DepartmentModel.find();

    if (departments.length === 0) {
      throw Error("No departments found");
    }

    return departments;
  }

  static async addMembersField() {
    const newField = EmployeeModel.aggregate([
      {
        $addFields: {
          access_token: '',
        },
      },
    ]);
    return newField;
  }
}

module.exports = DepartmentService;
