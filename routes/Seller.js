const express = require("express");
const routerseller = express.Router();
const {sellerfun,editsellerfun, sellerdeletefun, editupdatesellerfun, mydeliveryfun, addbulkfun }= require('../controllers/sellerController');
const isAuth = require("../middleware/isAuth");


routerseller.route("/Seller").get(isAuth,sellerfun);
routerseller.route("/editseller").get(isAuth,editsellerfun)
routerseller.route("/sellerdelete/:id").get(sellerdeletefun)
routerseller.route("/editupdateseller/:id").post(editupdatesellerfun)
routerseller.route("/mydelivery").get(isAuth,mydeliveryfun)
routerseller.route("/addbulk").get(isAuth,addbulkfun)
module.exports={routerseller}