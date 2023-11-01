"use strict";

const requireToken = require("../middleware");
const router = require("express").Router();
const { models } = require("../db");
const { LineItem, Product } = models;

// GET all line items
router.get("/", requireToken, async (req, res, next) => {
  try {
    const products = await LineItem.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET specific line item by ID
router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const product = await LineItem.findByPk(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// POST a new line item or update existing one
router.post("/", requireToken, async (req, res, next) => {
  try {
    const [item, created] = await LineItem.findOrCreate({
      where: { id: req.body.id },
      defaults: {
        name: req.body.name,
        productId: req.body.productId,
        quantity: req.body.quantity,
        price: req.body.price,
        stock: req.body.stock,
        imageUrl: req.body.imageUrl,
      },
    });

    if (!created) {
      const newItem = await item.update({
        quantity: item.quantity + 1,
      });
      res.send(newItem);
      return;
    }

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

// DELETE a line item by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("LineItem ID is missing");
    }
    await LineItem.destroy({ where: { id } });
    res.status(204).send(); // Success, no content
  } catch (error) {
    console.error("Error deleting line item:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT endpoint to decrease the quantity
router.put("/decrease/:id", async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await LineItem.findByPk(itemId);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    if (item.quantity > 0) {
      item.quantity -= 1;
      await item.save();
      res.json(item);
    } else {
      await item.destroy();
      res.status(400).send("Item quantity is already at the minimum");
    }
  } catch (err) {
    next(err);
  }
});

// PUT endpoint to increase the quantity
router.put("/increase/:id", async (req, res, next) => {
  try {
    const itemId = req.params.id; // Get the item ID from the route parameters
    const item = await LineItem.findByPk(itemId);
    console.log(`Current Quantity: ${item.quantity}, Stock: ${item.stock}`);
    if (!item) {
      return res.status(404).send("Item not found");
    }

    if (item.quantity < item.stock) {
      // Only increase if the quantity is less than available stock
      item.quantity += 1;
      await item.save();
      res.json(item);
    } else {
      res.status(400).send("Item quantity has reached the stock limit");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
