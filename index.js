const express = require("express");
const winston = require("winston");

const app = express();
require("./startup/logging")(); //logging errors
require("./startup/routes")(app); //load the routes
require("./startup/db")(); //connect to database
require("./startup/config")(); //check for config values or env values. if not found throw error
require("./startup/validation")(); //Joi related statements req for api endpoint events validation
require("./startup/prod")(app);
const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
