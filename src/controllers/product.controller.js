const express = require("express");
const Product = require("../models/product.model");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    return res.send({ Product: product });
  } catch (error) {}
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    return res.send({ Product: products });
  } catch (error) {}
});

module.exports = router;
