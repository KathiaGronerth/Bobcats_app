const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("Order", {
  totalCost: {
    type: Sequelize.DECIMAL(10, 2), // DECIMAL type for monetary values
    defaultValue: 0.0,
  },
  shoppingMethod: {
    type: Sequelize.TEXT, // Add more methods as needed
    defaultValue: "store pickup",
  },
  paymentMethod: {
    type: Sequelize.STRING, // Add more methods as needed
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  cardName: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.ENUM("incomplete", "received", "shipped", "delivered"), // Add more states as needed
    defaultValue: "incomplete",
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Users", // Assuming you have a User model for those who leave reviews
      key: "id",
    },
  },
});

module.exports = Order;
