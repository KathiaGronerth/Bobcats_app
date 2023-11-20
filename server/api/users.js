const router = require("express").Router();
const { models } = require("../db");
const { User, PaymentMethod } = models;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: PaymentMethod, as: "userPaymentMethods" }],
    });
    if (user) res.json(user);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/paymentMethods", async (req, res, next) => {
  try {
    const paymentMethods = await PaymentMethod.findAll({
      where: { userId: req.params.userId },
    });
    res.json(paymentMethods);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/paymentMethods/:id", async (req, res, next) => {
  try {
    const paymentMethod = await PaymentMethod.findOne({
      where: {
        id: req.params.id,
        userId: req.params.userId, // Ensure the payment method belongs to the user
      },
    });

    if (paymentMethod) {
      res.json(paymentMethod);
    } else {
      res.sendStatus(404); // Not found either because it doesn't exist or it doesn't belong to the user
    }
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
});

router.post("/:id/paymentMethods", async (req, res, next) => {
  try {
    const { type, provider, token, lastFour, expirationDate, userId } =
      req.body;
    const newPaymentMethod = await PaymentMethod.create({
      type,
      provider,
      token,
      lastFour,
      expirationDate,
      userId,
    });
    res.status(201).json(newPaymentMethod);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
