"user strict";

const express = require("express");
const bodyParser = require("body-parser");

//-------------------------ADMIN---------------------------
const department = require("../controllers/admin/department");
const jobPosition = require("../controllers/admin/job-position");
const warehouse = require("../controllers/admin/warehouse");
const employee = require("../controllers/admin/employee");
const user = require("../controllers/admin/user");
const rol = require("../controllers/admin/rol");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  //-------------------------ADMIN---------------------------

  ///////DEPARTMENTS
  app.get("/department", department.getAll);
  app.get("/department/:id", department.findByPk);
  app.post("/department", department.create);
  app.put("/department/:id", department.update);
  app.delete("/department/:id", department.delete);
  app.put("/department/changeStatus/:id", department.changeStatus);

  ///////JOBPOSITION
  app.get("/jobPosition", jobPosition.getAll);
  app.get("/jobPosition/:id", jobPosition.findByPk);
  app.post("/jobPosition", jobPosition.create);
  app.put("/jobPosition/:id", jobPosition.update);
  app.delete("/jobPosition/:id", jobPosition.delete);
  app.put("/jobPosition/changeStatus/:id", jobPosition.changeStatus);

  ///////WAREHOUSE
  app.get("/warehouse", warehouse.getAll);
  app.get("/warehouse/:id", warehouse.findByPk);
  app.post("/warehouse", warehouse.create);
  app.put("/warehouse/:id", warehouse.update);
  app.delete("/warehouse/:id", warehouse.delete);
  app.put("/warehouse/changeStatus/:id", warehouse.changeStatus);

  ///////EMPLOYEE
  app.get("/employee", employee.getAll);
  app.get("/employee/:id", employee.findByPk);
  app.post("/employee", employee.create);
  app.put("/employee/:id", employee.update);
  app.delete("/employee/:id", employee.delete);
  app.put("/employee/changeStatus/:id", employee.changeStatus);

  ///////USUARIO
  app.get("/user", user.getAll);
  app.get("/user/:id", user.findByPk);
  app.post("/user", user.create);
  app.put("/user/:id", user.update);
  app.delete("/user/:id", user.delete);
  app.post("/user/login", user.login);
  app.put("/user/changeStatus/:id", user.changeStatus);

  ///////ROLES
  app.get("/rol", rol.getAll);
  app.get("/rol/:id", rol.findByPk);
  app.post("/rol", rol.create);
  app.put("/rol/:id", rol.update);
  app.delete("/rol/:id", rol.delete);
  app.put("/rol/changeStatus/:id", rol.changeStatus);

  module.exports = app;
};
