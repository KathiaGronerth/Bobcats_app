// server/api/drivers.js
const router = require("express").Router();
const { Driver } = require("../db").models; // Adjust the path to your db index file as necessary

// Get all drivers
router.get("/", async (req, res, next) => {
  try {
    const drivers = await Driver.findAll();
    res.json(drivers);
  } catch (err) {
    next(err);
  }
});

// Add a new driver
router.post("/", async (req, res, next) => {
  try {
    const newDriver = await Driver.create(req.body);
    res.json(newDriver);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
