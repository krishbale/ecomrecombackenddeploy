const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
var mongo = require("mongodb").MongoClient;
const express = require("express");
const router = express.Router();
var cookieParser = require("cookie-parser");
const Shipdata = require("../models/shipdataSchema");
router.use(cookieParser());
const jwt = require("jsonwebtoken");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const register = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ error: "please fill the field properly " });
  }
  try {
    const userExist = await User.findOne({ username: username });
    if (userExist) {
      return res.status(422).json({ error: "Choose another username " });
    } else {
      const user = new User({ username, password });
      //tokenize  password
      await user.save();
      res.json({ message: "User registered successfully " });
    }
  } catch (err) {
    console.log(err);
  }
};
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(422).json({ error: "please fill the field properly " });
    }

    const userLogin = await User.findOne({ username: username });
    if (!userLogin) {
      res.status(422).json({ message: "Not a Valid Credentials" });
      console.log("Not valid Credentials");
    } else if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(422).json({ message: "Try again with valid passwords" });
      } else {
        const userSession = { username: userLogin.username }; //creating user session to keep user logged in also in refresh
        req.session.user = userSession; //attach user session to session objects from express-session

        //token generation
        const token = await userLogin.generateAuthToken();
        // console.log(token);
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(200).json({
          message: "user login successfull",
          roles: userLogin.roles,
          success: true,
          userSession,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
const logout = (req, res) => {
  console.log("logout server");
  res.clearCookie("jwtoken", { path: "/" });
  res.clearCookie("session-id", { path: "/" });
  res.status(200).send("session Timeout , signing off");
};
const sessioncontroller = async (req, res) => {
  if (req.session.user) {
    return res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ msg: "nosession" });
  }
};
const handleshippingform = async (req, res) => {
  console.log(req.body);
  const {
    firstName,

    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
  } = req.body;

  if (!firstName || !lastName || !address1 || !city || !state || !country) {
    return res.status(422).json({
      error: "only address2 and zip or optional Please fill the form properly",
    });
  }
  try {
    const shipdata = new Shipdata({
      firstName,

      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      country,
    });
    await shipdata.save();
    res.json({ msg: "log created successfully" });
  } catch (e) {
    console.log(e);
  }
};
const getshiipingdetails = async (req, res) => {
  const details = await Shipdata.findOne({ userid: req.userID });
  res.send(details);
};

module.exports = {
  register,
  handleshippingform,
  login,
  logout,
  sessioncontroller,
  getshiipingdetails,
};
