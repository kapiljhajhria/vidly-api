const express = require("express");

const app = express();
require("./startup/logging")(); //logging errors
require("./startup/routes")(app); //load the routes
require("./startup/db")(); //connect to database
require("./startup/config")(); //check for config values or env values. if not found throw error
require("./startup/validation")(); //Joi related statements req for api endpoint events validation
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
