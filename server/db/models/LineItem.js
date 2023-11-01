const Sequelize = require("sequelize");
const db = require("../db");
const LineItem = db.define("LineItem", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  price: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 20 },
  stock: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 10 },
  quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  imageUrl: { type: Sequelize.STRING, defaultValue: "png" },
});

module.exports = LineItem;
