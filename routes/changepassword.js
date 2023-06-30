const express = require("express");
const routerchangepassword = express.Router();
const { changepasswordfun } = require("../controllers/changepasswordController");
const { changepasswordpostfun } = require("../controllers/changepasswordController");

routerchangepassword.route("/changepassword").get(changepasswordfun);
routerchangepassword.route("/changepassword/change").post(changepasswordpostfun);
module.exports = { routerchangepassword };