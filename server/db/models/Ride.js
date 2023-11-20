const Sequelize = require("sequelize");
const db = require("../db"); // Make sure you have a db.js for your database connection

const Ride = db.define("Ride", {
  startLocationLatitude: {
    type: Sequelize.FLOAT,
  },
  startLocationLongitude: {
    type: Sequelize.FLOAT,
  },
  endLocationLatitude: {
    type: Sequelize.FLOAT,
  },
  endLocationLongitude: {
    type: Sequelize.FLOAT,
  },
  date: {
    type: Sequelize.DATEONLY,
  },
  time: {
    type: Sequelize.TIME,
  },
  availableSeats: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
  pricePerSeat: {
    type: Sequelize.DECIMAL(10, 2),
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  driverId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Ride;
