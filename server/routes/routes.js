"user strict";

const express = require("express");
const bodyParser = require("body-parser");

//-------------------------ADMIN---------------------------
const dates = require("../controllers/admin/dates");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  //-------------------------ADMIN---------------------------

  ///////datesS
  app.get("/dates", dates.getAll);
  app.get("/dates/:id", dates.findByPk);
  app.post("/dates", dates.create);
  app.put("/dates/:id", dates.update);
  app.delete("/dates/:id", dates.delete);
  app.put("/dates/changeStatus/:id", dates.changeStatus);

  module.exports = app;
};
