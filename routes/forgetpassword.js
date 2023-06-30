const express = require("express");
const routerforgetpassword = express.Router();
const {forgetpasswordgetfun,forgetpasswordpostfun}= require("../controllers/forgetpasswordController");

routerforgetpassword.route("/forgetpassword").get(forgetpasswordgetfun).post(forgetpasswordpostfun);
module.exports={routerforgetpassword};
