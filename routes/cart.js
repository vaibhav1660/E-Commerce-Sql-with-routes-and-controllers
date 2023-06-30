const express = require("express");
const routercart = express.Router();
const {cartfun, cartdecrementfun, cartdeletefun, cartincrementfun, addtocartfun, placeorderfun, placeorderformfun, getorders, handleAddress, sendSuccess} = require("../controllers/cartController");
const isAuth = require("../middleware/isAuth");
 
routercart.route("/cart").get(isAuth,cartfun);
routercart.route("/cart/decrement/:id").get(cartdecrementfun);

routercart.route("/delete/:id").get(cartdeletefun);
routercart.route("/cart/increment/:id").get(cartincrementfun);
routercart.route("/addtocart/:id").get(addtocartfun);
routercart.route("/cart").get(isAuth,cartfun);
routercart.route("/placeorder").get(isAuth,placeorderfun);
routercart.route("/getaddress").post(isAuth,handleAddress);
routercart.route("/placeorderform").get(placeorderformfun);
routercart.route("/myorders").get(isAuth,getorders);
routercart.route("/success").get(isAuth,sendSuccess);


module.exports = { routercart};