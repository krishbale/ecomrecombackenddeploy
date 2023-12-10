const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const path = require('path');
const app = express();
require("dotenv").config();

const connectDB = require("./db/connect");
app.use(express.json());
const User = require("./models/userSchema");

const MongoDBStore = require("connect-mongo");

const PORT = process.env.PORT || 5000;
const DB = process.env.MONGODB_URL;

const MAX_AGE = 1000 * 60 * 60 * 24; // 3hrs
//connecting to the settin up connect -mongodb-session store
const MongoDBstore = MongoDBStore.create({
  mongoUrl: DB,
  collectionName: "mySessions",
});
app.use(
  session({
    secret: "a1s2d3f4g5h6",
    name: "session-id", //cookies name to be put in "key" field in postman
    store: MongoDBstore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: false, // to turn on just in productions
    },
    resave: true,
    saveUninitialized: false,
  })
);
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

const reactBuild = path.join(__dirname,'front', 'build',)
app.use(express.static(reactBuild))

app.get('*',async(req,res)=>{
  res.sendFile(path.join(reactBuild,'index.html'))
})


app.use("/", userRouter);
app.use("/", productRouter);

// middlware

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(` Database connected and server is listening at PORT http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};
start();
