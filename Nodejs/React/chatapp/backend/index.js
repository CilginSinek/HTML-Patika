const express = require("express");
const session = require("express-session");
const http = require("http");
// const MongoStore = require("connect-mongo");
// const mongoose = require("mongoose");

const cors = require("cors");

const hyperlinker = require("hyperlinker");
require("dotenv").config();

//* import Routers
const pageRouter = require("./router/pageRouter");
const { SocketFunc } = require("./controller/socketController");
// const authRouter = require("./router/authRouter");

//* app settings
const app = express();
const port = 3000;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// mongoose.connect(process.env.MONGOURL, {}).then(() => {
//   console.log("DB Connected Successfully");
// });

//* Middlewares
const corsOptions = {
  origin: process.env.LOCALHOST,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: "Content-Type",
};
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: process.env.MONGOURL }),
//   })
// );

//* SET ROUTER
app.use("/", pageRouter);
// app.use("/auth", authRouter);
SocketFunc(io);

server.listen(port, () => {
  const link = hyperlinker(
    "http://localhost:" + port,
    "http://localhost:" + port
  );
  console.log(`Example app listening on ${link}`);
});
