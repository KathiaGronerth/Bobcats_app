const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("Product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "A nice piece of product",
  },
  price: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 20 },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Electronics",
  },
  subcategory: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Stoves",
  },
  stock: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  imageUrl: { type: Sequelize.STRING, defaultValue: "png" },
  quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
  rating: {
    type: Sequelize.DECIMAL(3, 2), // This allows values like 4.5
    allowNull: true,
    validate: { min: 0, max: 5 }, // Assuming ratings are between 0 to 5
  },
});

module.exports = Product;
