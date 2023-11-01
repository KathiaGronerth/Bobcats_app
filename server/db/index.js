// This is the access point for all things database related!

const db = require("./db");

const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const LineItem = require("./models/LineItem");
const Review = require("./models/Review");
const PromoCode = require("./models/PromoCode");

// Associations

// User to Order associations
User.hasMany(Order);
Order.belongsTo(User);

// LineItem to Order and Product associations
Order.belongsToMany(LineItem, { through: "Order_Items" });
LineItem.belongsToMany(Order, { through: "Order_Items" });
LineItem.belongsTo(Product);
Product.hasMany(LineItem);

// Review to Product associations
Product.hasMany(Review, {
  foreignKey: "productId",
  as: "reviews",
});
Review.belongsTo(Product, { foreignKey: "productId" });

// Review to User associations
// (Optional: If you want to track which user wrote which review)
User.hasMany(Review, {
  foreignKey: "userId",
  as: "userReviews",
});
Review.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    LineItem,
    Review,
    PromoCode,
  },
};
