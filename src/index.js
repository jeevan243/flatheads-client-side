const express = require("express");
const connect = require("./config/db");
require("dotenv").config();
const productsContrller = require("./controllers/product.controller");

const Port1 = process.env.Port || 1234;
const app = express();
app.use(express.json());

app.use("/products", productsContrller);

app.use(express.static("Public"));

// app.set("views", "views");
app.set("view Engine", "ejs");

app.get("", (req, res) => {
  return res.render("product.ejs");
});

app.get("/Productpage", (req, res) => {
  return res.render("Productpage.ejs");
});

app.get("/cart", (req, res) => {
  return res.render("cart.ejs");
});


app.listen(Port1, async (req, res) => {
  try {
    await connect();
    console.log(`Connected to the ${Port1}`);
  } catch (error) {
    console.log(error.message);
  }
});
