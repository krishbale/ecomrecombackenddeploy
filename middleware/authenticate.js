const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
// var cookies =

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;

    const verifyToken = jwt.verify(token, process.env.SECRECT_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized:NO token provided");
    console.table(error);
  }
};
module.exports = authentication;
