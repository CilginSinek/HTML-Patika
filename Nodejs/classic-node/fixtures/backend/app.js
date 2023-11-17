const express = require("express");
const fileUpload = require("express-fileupload");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

const pageRouter = require("./routers/pageRouter");
const apiRouter = require("./routers/apiRouter");
const authRouter = require("./routers/authRouter");

const app = express();
const port = 3000;

mongoose
  .connect(process.env.MONGOURL, {})
  .then(() => {
    console.log("DB Connected Successfully");
  });

const corsOptions = {
  origin: "http://localhost:5173", // Bu '*' yerine güvenli olarak sadece belirli bir URL veya alan adı belirleyebilirsiniz
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: 'Content-Type',
}
app.use(cors(corsOptions))
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

app.use("/page",pageRouter);
app.use("/api",apiRouter);
app.use("/auth",authRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})