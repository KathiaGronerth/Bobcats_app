const router = require("express").Router();
const { Ride } = require("../db").models; // Adjust the path to your db index file as necessary

// Get all rides
router.get("/", async (req, res, next) => {
  try {
    const rides = await Ride.findAll();
    res.json(rides);
  } catch (err) {
    next(err);
  }
});

// Add a new ride
router.post("/", async (req, res, next) => {
  try {
    const newRide = await Ride.create(req.body);
    res.json(newRide);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
