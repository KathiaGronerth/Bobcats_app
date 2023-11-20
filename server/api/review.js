const router = require("express").Router();
const { models } = require("../db");
const { Review, Product, User } = models;
const requireToken = require("../middleware");

// Get all reviews for a specific product
router.get("/product/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId || productId === "undefined") {
      return res.status(400).send("Product ID is not defined.");
    }
    const reviews = await Review.findAll({
      where: { productId },
      include: { model: User, attributes: ["id", "username"] },
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// Post a new review for a product (with authentication)
router.post("/product/:productId", requireToken, async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId || isNaN(productId)) {
      return res.status(400).send("Invalid product ID.");
    }
    const { title, content, rating } = req.body;
    const userId = req.user.id;

    if (!title || !rating) {
      // Check if title and rating are provided
      return res.status(400).send("Title and rating are required.");
    }

    const review = await Review.create({
      title,
      content,
      rating,
      productId,
      userId,
    });

    res.status(201).json(review);
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
