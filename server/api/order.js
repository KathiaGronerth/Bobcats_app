const router = require("express").Router();
const { models } = require("../db");
const User = require("../db/models/User");
const { Order, LineItem } = models;
const requireToken = require("../middleware");

router.get("/", requireToken, async (req, res, next) => {
  try {
    const orders = await User.findByPk(req.user.id, {
      include: { model: Order },
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
