const { body, validationResult } = require("express-validator");
const EmployeeService = require("../services/employee");
const Utility = require("../utils");

class Middleware {
  static async validateEmployee(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  static async validateDepartment(req, res, next) {
    const validateDepartment = [
      body("name").notEmpty().withMessage("Name cannot be empty"),
      body("description").notEmpty().withMessage("Description cannot be empty"),
    ];
    try {
    } catch (error) {
      console.error(error);
    }
  }

  static validateQuery(isRequired) {
    return function (req, res, next) {
      if (isRequired && Object.keys(req.query).length === 0) {
        return res.status(400).json({ error: "Query parameter is required!" });
      }

      const allowedQueries = ["name"];

      const queryParams = Object.keys(req.query);

      const invalidQueries = queryParams.filter(
        (query) => !allowedQueries.includes(query)
      );

      console.log("Query", req.query);

      if (invalidQueries.length > 0) {
        return res.status(400).json({ error: "Invalid query parameter!" });
      }
      next();
    };
  }

  static async validateAccessToken(req, res, next) {
    const { authorization } = req.headers;
    try {
      if (!authorization) {
        return res
          .status(400)
          .json({ error: "Authorization token is required" });
      }
      if (Utility.isBearerToken(authorization)) {
        const splitAuth = authorization.split(" ")[1];

        const employeeList = await EmployeeService.getEmployees();

        if (employeeList) {
          const isValidToken = employeeList.find(
            (e) => splitAuth === e.access_token
          );
          if (!isValidToken) {
            return res.status(400).json({ error: "Invalid token" });
          }
          next();
        } else {
          return res.status(400).json({ error: "Invalid token" });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Middleware;
