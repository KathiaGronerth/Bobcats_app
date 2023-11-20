const User = require("./db/models/User");

const requireToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) throw new Error("Token not provided.");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7); // Ensure consistent token parsing
    } else {
      throw new Error("Invalid token format.");
    }

    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in requireToken:", error.message); // Log the error
    next(error);
  }
};

module.exports = requireToken;
