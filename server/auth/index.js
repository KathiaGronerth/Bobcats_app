// server/auth/index.js
const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Adjust based on your file storage strategy
const {
  models: { User },
} = require("../db");

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", upload.single("photo"), async (req, res, next) => {
  try {
    console.log(req.file); // Log to see if the file is coming through
    console.log(req.body); // Log to check other form data
    const user = await User.create({ ...req.body, photo: req.file.path }); // Assuming photo is being stored
    console.log("Created user with ID:", user.id);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Token required" });
    }
    res.send(await User.findByToken(token));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
