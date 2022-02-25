const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    id: { type: Number, require: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    title: { type: String, required: true },
    original_price: { type: String, required: true },
    final_price: { type: String, required: true },
    offer: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = mongoose.model("products", productsSchema);

module.exports = Product;
