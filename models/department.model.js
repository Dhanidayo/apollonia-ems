const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: String,
  description: String,
  members: Array,
});

const DepartmentModel = mongoose.model("Department", departmentSchema);

module.exports = DepartmentModel;
