const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET = process.env.JWT || "123";

const SALT_ROUNDS = 5;

const User = db.define("User", {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true, notEmpty: true },
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { is: ["^[a-zA-Z0-9_.-]*$"], notEmpty: true },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  mailingAddress: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zipcode: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  photo: {
    type: Sequelize.STRING, // or Sequelize.BLOB for binary data
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  console.log("Generating token for user ID:", this.id); // Log for debugging
  return jwt.sign({ id: this.id }, SECRET);
};

// User.authenticate = async function ({ username, password }) {
//   const user = await this.findOne({ where: { username } });
//   if (!user || !(await user.correctPassword(password))) {
//     const error = Error("Incorrect username/password");
//     error.status = 401;
//     throw error;
//   }
//   return user.generateToken();
// };

User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } }); // Use email instead of username
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect email/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    console.log("Received token for verification:", token); // Debug log
    const { id } = await jwt.verify(token, SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (ex) {
    console.error("Token verification failed:", ex.message); // Detailed error log
    const error = new Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
