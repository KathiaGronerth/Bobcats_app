// server/api/cars.js
const router = require("express").Router();
const { Car } = require("../db").models; // Adjust the path to your db index file as necessary

// Get all cars
router.get("/", async (req, res, next) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

// Add a new car
router.post("/", async (req, res, next) => {
  try {
    const newCar = await Car.create(req.body);
    res.json(newCar);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
