const Sequelize = require("sequelize");
const db = require("../db");

const Item = db.define("Item", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Add a reference to the Order model
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Orders", // This is the table name, which Sequelize usually pluralizes
      key: "id",
    },
  },
  // Assuming a product reference is needed
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Products", // This should be the table name of your Product model
      key: "id",
    },
  },
  name: { type: Sequelize.STRING },
  price: { type: Sequelize.INTEGER, defaultValue: 20 },
  quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
  totalPrice: {
    type: Sequelize.VIRTUAL(Sequelize.DECIMAL(10, 2), ["price", "quantity"]),
    get() {
      const price = this.getDataValue("price");
      const quantity = this.getDataValue("quantity");
      return (price * quantity).toFixed(2); // Returns the product of price and quantity
    },
  },
});

module.exports = Item;
