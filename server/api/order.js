const router = require("express").Router();
const { models } = require("../db");
const { Order, User, LineItem, Product, Item } = models;

router.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId || userId === "undefined") {
      return res.status(400).send("User ID is not defined.");
    }
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: Item,
          include: [Product],
        },
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [
        {
          model: Item,
          include: [Product],
        },
      ],
    });

    if (order) {
      res.json(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/user/:userId", async (req, res, next) => {
  try {
    const {
      totalCost,
      shoppingMethod,
      paymentMethod,
      orderDate,
      cardName,
      state,
      lineItems,
    } = req.body;

    if (!shoppingMethod || !paymentMethod) {
      return res
        .status(400)
        .send("Delivery method and payment method are required.");
    }

    const newOrder = await Order.create({
      totalCost,
      shoppingMethod,
      paymentMethod,
      orderDate,
      cardName,
      state,
      userId: req.params.userId,
    });

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      console.error("No line items provided");
      return res.status(400).send("No line items provided");
    }

    for (const item of lineItems) {
      await Item.create({
        orderId: newOrder.id,
        productItemId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        // Make sure not to include the 'id' field here
      });
    }

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).send(`Error processing request: ${error.message}`);
  }
});

module.exports = router;
