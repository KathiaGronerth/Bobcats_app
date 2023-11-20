const Sequelize = require("sequelize");
const db = require("../db");

const Car = db.define("Car", {
  model: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  make: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  color: {
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
  licensePlate: {
    type: Sequelize.STRING, // Changed to STRING
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Car;
