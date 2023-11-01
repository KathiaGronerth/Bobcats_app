const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET = process.env.JWT || "123";

const SALT_ROUNDS = 5;

const User = db.define("User", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { is: ["^[a-zA-Z0-9_.-]*$"], notEmpty: true },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { is: ["^[a-zA-Z0-9_.-]*$"], notEmpty: true },
  },
  middleName: {
    type: Sequelize.STRING,
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
  phoneNumber: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
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
  return jwt.sign({ id: this.id }, SECRET);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user.generateToken();
  }
  const error = Error("Incorrect email/password");
  error.status = 401;
  throw error;
};

User.findByToken = async function (token) {
  try {
    console.log("Token:", token); // Logging the token for debug purposes
    console.log("SECRET:", SECRET); // Logging the secret for debug purposes

    // Extract token if it starts with "Bearer "
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    const { id } = jwt.verify(token, SECRET);
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    console.error(err); // Logging the error
    const error = Error("Token error: " + err.message);
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
