const express = require("express");

const {
  register,
  login,
  logout,
  sessioncontroller,
  handleshippingform,
  getshiipingdetails,
} = require("../controller/user");
const authentication = require("../middleware/authenticate");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/isAuth", sessioncontroller);
router.post("/shippingform", authentication, handleshippingform);
router.get("/sdetails", getshiipingdetails);

module.exports = router;
