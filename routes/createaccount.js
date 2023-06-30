const express = require("express");
const routercreate = express.Router();
const {createaccountfun,createaccountpostfun}= require('../controllers/createaccountController');

routercreate.route("/createaccount").get(createaccountfun).post(createaccountpostfun);


module.exports={routercreate};