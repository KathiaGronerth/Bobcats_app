const router = require("express").Router();
const { models } = require("../db");
const { User } = models;
//require admin token

const validateToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    if (!token) {
      console.log("Token not found in headers");
      return res.status(401).send({ error: "Token required" });
    }
    const user = await User.findByToken(token);
    if (!user) {
      console.log("User not found with provided token");
      return res.status(401).send({ error: "Invalid Token" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Error in validateToken middleware:", err);
    return res.status(401).send({ error: "Token validation failed" });
  }
};

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "isAdmin"],
    });
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateToken, async (req, res, next) => {
  try {
    console.log("Entered PUT route");
    const userId = req.params.id;
    console.log("UserID:", userId);
    const userDetailsToUpdate = req.body;

    if (!userId || userId === "undefined") {
      return res.status(400).send({ error: "User ID is required." });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }

    // Ensure the updating user has the right to change the data
    if (user.id !== req.user.id) {
      return res
        .status(403)
        .send({ error: "You don't have the permission to update this user." });
    }

    const updatedUser = await user.update(userDetailsToUpdate);

    return res.status(200).send(updatedUser);
  } catch (err) {
    console.log("Error in PUT route:", err);
    next(err);
  }
});

module.exports = router;
