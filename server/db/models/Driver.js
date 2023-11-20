// server/db/models/driver.js
const Sequelize = require("sequelize");
const db = require("../db"); // Make sure you have a db.js for your database connection

const Driver = db.define("Driver", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vehicle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  license: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Driver;
