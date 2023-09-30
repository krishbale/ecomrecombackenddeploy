require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const Product = require("./models/productSchema");
const product = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();
    await Product.create(product);
    console.log("success");
  } catch (e) {
    console.log(e);
  }
};

start();
