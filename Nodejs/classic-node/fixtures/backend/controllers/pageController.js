const Category = require("../models/product/Category");
const Types = require("../models/product/Type");
const Product = require("../models/product/Product");

const User = require("../models/User");
const Type = require("../models/product/Type");

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send(JSON.stringify({ categories, status: "success" }));
  } catch (error) {
    res.status(400).send(JSON.stringify({ status: "error", message: error }));
  }
};

exports.getTypes = async (req, res) => {
  try {
    const types = await Types.find({});
    res.status(200).send(JSON.stringify({ types, status: "success" }));
  } catch (error) {
    res.status(400).send(JSON.stringify({ status: "error", message: error }));
  }
};

exports.getProducts = async (req, res) => {
  try {
    console.log("segs")
    const category = await Category.findOne({ slug: req.params.category });
    const type = await Types.findOne({ slug: req.params.type });
    const products = await Product.find({
      type: type._id,
      category: category._id,
    });
    res.status(200).send(JSON.stringify({ products, status: "success" }));
  } catch (error) {
    res.status(400).send(JSON.stringify({ status: "error", message: error }));
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category").populate("type");
    res.status(200).send(JSON.stringify({ product, status: "success" }));
  } catch (error) {
    res.status(400).send(JSON.stringify({ status: "error", message: error }));
  }
};

exports.getBasket = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID).select("-password").populate({
      path:'reserved',
      populate:[
        {path:"category",model:"Category"},
        {path:"type",model:"Type"}
      ]
    });
    res.status(200).json({
      status: "success",
      products: user.reserved,
    });
  } catch (error) {
    console.log(error)
    res.status(400).send(JSON.stringify({ status: "error", message: error }));
  }
};

exports.getAdminPage = async (req, res) => {
  const users = await User.find().populate("reserved");
  const products = await Product.find().populate("reserves", "-password").populate("category").populate("type");
  const categories = await Category.find();
  const types = await Types.find();

  res.status(200).json({ users, products, categories, types });
};

exports.getHomePage = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
exports.createPage = async (req,res)=>{
  const categories = await Category.find();
  const types = await Type.find();
  res.status(200).json({types,categories})
}
