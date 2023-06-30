const express = require("express");
const routeradmin = express.Router();
const {adminfun }= require('../controllers/adminController');
const {admindeletefun} = require("../controllers/adminController");
const { editfun }= require('../controllers/adminController');
const { editupdatefun } = require("../controllers/adminController");
const isAuth = require("../middleware/isAuth");

routeradmin.route("/Admin").get(isAuth,adminfun);
routeradmin.route("/admindelete/:id").get(admindeletefun);
routeradmin.route("/edit").get(isAuth,editfun);
routeradmin.route("/editupdate/:id").post(editupdatefun);
module.exports={routeradmin};