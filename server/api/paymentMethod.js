const router = require("express").Router();
const { models } = require("../db");
const { PaymentMethod, User } = models;

router.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId || userId === "undefined") {
      return res.status(400).send("User ID is not defined.");
    }
    const paymentMethods = await PaymentMethod.findAll({
      where: { userId },
      include: { model: User, attributes: ["id", "username"] },
    });
    res.json(paymentMethods);
  } catch (error) {
    next(error);
  }
});

router.post("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId || isNaN(userId)) {
      return res.status(400).send("Invalid user ID.");
    }
    const { type, provider, number, lastFour, cvv, expirationDate, cardName } =
      req.body;
    const paymentMethod = await PaymentMethod.create({
      type,
      provider,
      number,
      lastFour: number.slice(-4),
      cvv,
      expirationDate,
      cardName,
      userId,
    });

    res.status(201).json(paymentMethod);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      return res
        .status(400)
        .send({ errors: error.errors.map((e) => e.message) });
    }
    next(error);
  }
});

module.exports = router;
