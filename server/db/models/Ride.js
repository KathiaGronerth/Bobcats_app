const Sequelize = require("sequelize");
const db = require("../db"); // Make sure you have a db.js for your database connection

const Ride = db.define("Ride", {
  source: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  destination: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  seats: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  pricePerSeat: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Ride;
