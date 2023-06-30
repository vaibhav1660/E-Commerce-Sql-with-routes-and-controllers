const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");
const { dirname } = require("path");
const sendEmail = require("./methods/sendEmail");
const sendPass = require("./methods/sendPass");
const isAuth = require("./middleware/isAuth.js");
const multer = require("multer");
const mongoose = require("mongoose");
//neconst 
const Razorpay =require("razorpay");
const cors=require("cors");
const path  =require("path");
const initialroute = require('./routes/initialroute');
const { routercreate } = require("./routes/createaccount");
const {cartmodel,productmodel,User} = require("./database/Schema");
const { routercart } =require("./routes/cart");
const { routeradmin } = require("./routes/Admin");
const { routerupload } = require("./routes/uploads");
const { routerforgetpassword } = require("./routes/forgetpassword");
const { routerchangepassword } = require("./routes/changepassword");
const { routerseller } = require("./routes/Seller");
//new
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// var instance = new Razorpay({
//   key_id: 'rzp_test_1rLEeNbKHL6UyZ',
//   key_secret: 'oasBLQWyn2aCb6hpKavDagYO',
// });
const config = {
  user:'sa',
  password: '1234',
  database: 'E-commerce',
  server: 'localhost',
  trustServerCertificate: true
}
const sql = require('mssql');






app.post('/payment',async(req,res)=>{
  console.log("create orderId requested",req.body);
var instance= new Razorpay({key_id:'rzp_test_1rLEeNbKHL6UyZ',  key_secret: 'oasBLQWyn2aCb6hpKavDagYO',})
let {amount}=req.body;

  var options = {
    // amount: req.body.amount,  // amount in the smallest currency unit
    amount:amount*100,
    currency: "INR",
    receipt: "rcp11"
  };
  // instance.orders.create(options, function(err, order) {
  //   console.log(order);
  //   res.send({orderId : order.id});
  // });
  instance.orders.create(options, function(err, order) {
    res.status(201).json({
      success:true,
      order,
      amount
    });
  });

});





app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    resave: false,
  })
);

app.set("view engine", "ejs");
const connect = async () => {
    try {
      const connection = await mongoose.connect(
        "mongodb://127.0.0.1:27017/Ecommerce"
      );
      // 127.0.0.1:27017
      console.log("Database is connected now");
    } catch (err) {
      console.log(err.message);
    }
  };
  // mongoose.connect;
  connect();


app.use('/',initialroute)

app.use(routercreate);

app.use(routercart);

app.use(routeradmin);
app.use(routerupload);

app.use(routerforgetpassword);
 
app.use(routerchangepassword);


app.use(routerseller);
app.get("*", function (req, res) {
    res.send("404");
  });
  
  app.listen(port, () => {
    console.log(`Listening to port at http://localhost:${port}`);
  });