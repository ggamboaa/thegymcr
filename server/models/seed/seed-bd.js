"use strict";

const models = require("../db");

//ADMIN
const _DEPARTMENTS = require("./admin/departments.json");
const _EMPLOYEES = require("./admin/employees.json");
const _JOB_POSITIONS = require("./admin/job-positions.json");
const _ROLS = require("./admin/rols.json");
const _USERS = require("./admin/users.json");
const _WAREHOUSES = require("./admin/warehouses.json");

function insertingMaintenanceData() {
  models.Department.bulkCreate(_DEPARTMENTS);
  models.Job_Position.bulkCreate(_JOB_POSITIONS);
  // models.Warehouse.bulkCreate(_WAREHOUSES)
  models.Employee.bulkCreate(_EMPLOYEES);
  models.Rol.bulkCreate(_ROLS);
}

module.exports = {
  insertingMaintenanceData,
};
