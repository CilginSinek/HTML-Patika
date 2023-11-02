const express = require('express');
const ejs = require("ejs");
const fileUpload = require('express-fileupload');
const mongoose  = require('mongoose');
const methodOverride = require('method-override');
require("dotenv").config();

const pageRouter = require("./router/pageRouter");
const apiRouter = require("./router/apiRouter");

const app = express()
const port = 3000

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Successfully");
  });


app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.use('/', pageRouter)
app.use('/api',apiRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})