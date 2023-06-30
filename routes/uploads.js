const express = require("express");
const routerupload = express.Router();
 
const multer = require("multer");
const { uploadfun,uploadsellerfun } = require("../controllers/uploadsController");
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads");
      },
      filename: function (req, file, cb) {
        cb(null, file.filename + "-" + Date.now() + ".jpg");
      },
    }),
  }).single("image");
routerupload.route("/upload").post(upload ,uploadfun);


routerupload.route("/uploadseller").post(upload,uploadsellerfun);



module.exports={routerupload};