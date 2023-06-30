const express = require("express");
const multer = require("multer");
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const {logingetfun,loginpostfun,logoutfun,slashfun, verifyfun, senddatafun, resetpassfun, verifymailfun, slashhomefun} = require('../controllers/initialController');
 

router.route('/').get(slashfun);
router.route("/home").get(isAuth,slashhomefun);
router.route('/Logout').get(logoutfun);
router.route('/Login').get(logingetfun).post(loginpostfun);

router.route("/verify").get(verifyfun);
router.route("/verifymail/:token").get(verifymailfun);

router.route("/sendData").get(senddatafun);
router.route("/resetpass/:token").get(resetpassfun);

module.exports = router;