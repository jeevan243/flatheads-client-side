const mongoose = require("mongoose");
require("dotenv").config()

const connect = () => {
  mongoose.connect(
    `mongodb+srv://jeevan:jeevan_243@cluster0.2q58b.mongodb.net/flatheads_products?retryWrites=true&w=majority`
  );
};

module.exports = connect;
