const User = require("../models/User");
const Product = require("../models/product/Product");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.reserveProduct = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const product = await Product.findById(req.body.id);
    //* push user and product info
    user.reserved.push(product._id);
    product.reserves.push(req.session.userID);
    //* save product and user
    await user.save();
    await product.save();
    res.status(201).json({ status: "success" });
  } catch (error) {
    res.status(404).json({ status: "error", message: error });
  }
};

exports.unReserveProduct = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const product = await Product.findById(req.body.id);
    //* pull user and product info
    user.reserved.pull(product._id);
    product.reserves.pull(user._id);
    //* save
    await user.save();
    await product.save();
    res.status(201).json({ status: "success" });
  } catch (error) {
    res.status(404).json({ status: "error", message: error });
  }
};

exports.sendMail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERMAIL,
      pass: process.env.USERPASS,
    },
  });

  await transporter
    .sendMail({
      from: `"${req.body.name}" <${process.env.USERMAIL}>`, // sender address
      to: `${process.env.USERMAIL}, ${req.body.email}`, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
    })
    .then(() => res.status(201).json({ status: "success" }))
    .catch((error) => res.status(404).json({ error }));
};
