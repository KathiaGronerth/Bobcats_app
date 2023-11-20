const Sequelize = require("sequelize");
const db = require("../db"); // Assuming you have a db.js file for database connection

const Car = db.define("Car", {
  make: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1886, // The year the first car was invented
      max: new Date().getFullYear(), // Current year
    },
  },
});

module.exports = Car;
