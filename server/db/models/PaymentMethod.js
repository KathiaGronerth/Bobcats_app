const Sequelize = require("sequelize");
const db = require("../db");

const PaymentMethod = db.define("PaymentMethod", {
  type: {
    type: Sequelize.STRING,
  },
  provider: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  number: {
    type: Sequelize.STRING,
    set(value) {
      // Set the card number
      this.setDataValue("number", value);

      // Extract and set the last four digits
      if (typeof value === "string" && value.length >= 4) {
        const lastFourDigits = value.slice(-4);
        this.setDataValue("lastFour", lastFourDigits);
      }

      // Determine the card provider
      if (value && value.startsWith("4")) {
        this.setDataValue("provider", "Visa");
      } else if (value && value.startsWith("5")) {
        this.setDataValue("provider", "MasterCard");
      } else {
        this.setDataValue("provider", "Unknown");
      }
    },
  },
  cvv: {
    type: Sequelize.STRING,
  },
  lastFour: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  expirationDate: {
    type: Sequelize.STRING,
  },
  cardName: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Users", // Ensure this matches the name of your User model
      key: "id",
    },
  },
});

module.exports = PaymentMethod;
