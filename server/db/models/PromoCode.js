// server/db/models/PromoCode.js
const Sequelize = require("sequelize");
const db = require("../db");

const PromoCode = db.define("PromoCode", {
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
  discount: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 1,
    },
  },
});

module.exports = PromoCode;
