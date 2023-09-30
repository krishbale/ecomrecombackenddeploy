const data = require("../ProductItem/product.json");

const products = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data,
  });
};
module.exports = products;
