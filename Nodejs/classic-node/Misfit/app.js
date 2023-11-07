const express = require("express");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
require("dotenv").config();

const pageRouter = require("./routers/pageRouter");
const courseRouter = require("./routers/courseApiRouter");
const authRouter = require("./routers/authRouter");
const { starter } = require("./middlewares/starter");

const app = express();
const port = 3000;

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Successfully");
  });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
  secret: process.env.SECRET, // Buradaki texti değiştireceğiz.
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGOURL })
  })
);
global.userIN = null;
global.userROLE = "guest";
global.profileUrl = null;

app.use('*', starter);
app.use("/", pageRouter);
app.use("/api", courseRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
