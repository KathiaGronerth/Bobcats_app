// This is the access point for all things database related!

const db = require("./db");

//const Product = require("./models/Product");
const User = require("./models/User");
// const Order = require("./models/Order");
// const LineItem = require("./models/LineItem");
const Review = require("./models/Review");
// const PromoCode = require("./models/PromoCode");
// const PaymentMethod = require("./models/PaymentMethod");
// const Item = require("./models/Item");
const Car = require("./models/Car");
const Driver = require("./models/Driver");
const Ride = require("./models/Ride");

// Associations

// User to Order associations
// User.hasMany(Order);
// Order.belongsTo(User);
// Product.hasMany(LineItem);
// LineItem.belongsTo(Product);
// Order.hasMany(Item, { foreignKey: "orderId" });
// Item.hasMany(Order, { foreignKey: "orderId" });
// Product.hasMany(Item);
// Item.belongsTo(Product);

// Order.hasMany(LineItem, { foreignKey: "orderId" });
// LineItem.belongsTo(Order, { foreignKey: "orderId" });

// User.hasMany(Order, { foreignKey: "userId", as: "userOrders" }); // Changed alias to 'userPaymentMethods'
// Order.belongsTo(User, { foreignKey: "userId" }); // Explicitly define the reverse association, if necessary

// // User.hasMany(PaymentMethod) sets up a one-to-many relationship
// User.hasMany(PaymentMethod, { foreignKey: "userId", as: "userPaymentMethods" }); // Changed alias to 'userPaymentMethods'
// PaymentMethod.belongsTo(User, { foreignKey: "userId" }); // Explicitly define the reverse association, if necessary

// // Review to Product associations
// Product.hasMany(Review, {
//   foreignKey: "productId",
//   as: "reviews",
// });
// Review.belongsTo(Product, { foreignKey: "productId" });

// Review to User associations
User.hasMany(Review, {
  foreignKey: "userId",
  as: "userReviews",
});
Review.belongsTo(User, { foreignKey: "userId" });

// Car associations (assuming each Car belongs to a User and a Driver)
User.hasMany(Car);
Car.belongsTo(User);

Driver.hasOne(Car);
Car.belongsTo(Driver);

// Ride associations (assuming each Ride is associated with a Driver)
Driver.hasMany(Ride);
Ride.belongsTo(Driver);

// User to Ride associations (assuming each User can have multiple Rides)
User.hasMany(Ride);
Ride.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    // Product,
    // Order,
    // LineItem,
    Review,
    // PromoCode,
    // PaymentMethod,
    // Item,
    Car,
    Driver,
    Ride,
  },
};
