const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      immutable: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    department: {
      type: String,
      required: true,
    },
    trainings: {
      type: Array,
      default: []
    },
    specializations: {
      type: Array,
      default: []
    },
    current_projects: {
      type: Array,
      default: []
    },
    patients: {
      type: Array,
      default: []
    },
    revenue_per_patient: {
      type: Number,
      default: 0
    },
    revenue_per_member: {
      type: Number,
      default: 0
    },
    access_token: {
      type: String,
      required: true,
      unique: true,
      immutable: true
    },
  },
  { timestamps: true }
);

module.exports = employeeSchema;
