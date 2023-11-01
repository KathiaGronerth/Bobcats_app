const Sequelize = require("sequelize");
const db = require("../db");

const Review = db.define("Review", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: { notEmpty: true },
  },
  rating: {
    type: Sequelize.DECIMAL(3, 2),
    allowNull: false,
    validate: { min: 0, max: 5 },
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Users", // Assuming you have a User model for those who leave reviews
      key: "id",
    },
  },
});

module.exports = Review;
