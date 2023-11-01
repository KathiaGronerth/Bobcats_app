const router = require("express").Router();
const { models } = require("../db");
const { PromoCode } = models;

router.get("/:code", async (req, res, next) => {
  try {
    const promo = await PromoCode.findOne({
      where: {
        code: req.params.code,
      },
    });
    if (promo) {
      res.json(promo);
    } else {
      res.status(404).send("Promo Code not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
