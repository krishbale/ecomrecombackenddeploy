const express = require("express");
const router = express.Router();
const product = require("../controller/products");
const recom = require("../controller/recommendation");
var cookieParser = require("cookie-parser");
router.use(cookieParser());
// const authentication = require('../middleware/authenticate')
// const auth = require('../middleware/auth')
const authentication = require("../middleware/authenticate");

router.get("/products/", authentication, product);
router.get("/getrecom/:id", authentication, recom);

module.exports = router;
