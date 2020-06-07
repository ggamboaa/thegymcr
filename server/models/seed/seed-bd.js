"use strict";

const models = require("../db");

//ADMIN
const _DATES = require("./admin/dates.json");

function insertingMaintenanceData() {
  models.Dates.bulkCreate(_DATES);
}

module.exports = {
  insertingMaintenanceData,
};
