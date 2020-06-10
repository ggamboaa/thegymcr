const express = require("express");
const db = require("./models/db");
// var cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
// const seed = require("./models/seed/seed-bd");

// setup the Express middleware
//require('./server/middleware/middleware')(app);
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// setup the API
require("./routes/routes")(app);

// connect to DB then run server
db.sequelize
  .sync({
    force: true,
  })
  // .then(() => {
  //   seed.insertingMaintenanceData();
  // })
  .then(() => {
    app.listen(port, () => {
      console.log("Running server on port  " + port);
    });
  });
