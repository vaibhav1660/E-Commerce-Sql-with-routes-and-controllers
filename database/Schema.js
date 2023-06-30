const mongoose = require("mongoose");
const user_schema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    mobile: Number,
    mailToken: Number,
    isVerified: Boolean,
    isAdmin: Boolean,
  });
  const User = mongoose.model("User", user_schema);
  
  
  // karoCreate()
  
  const product_schema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    price: Number,
    details: String,
    quantity: Number,
  });
  const productmodel = mongoose.model("products", product_schema);
  
  const cart_schema = new mongoose.Schema({
    username: {
      type: String,
    },
    items: {
      type: Array,
    },
  });
  const cartmodel = mongoose.model("cart", cart_schema);
  module.exports={cartmodel,productmodel,User}