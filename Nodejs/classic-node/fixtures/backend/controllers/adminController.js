const Product = require("../models/product/Product");
const Category = require("../models/product/Category");
const Types = require("../models/product/Type");
const User = require("../models/User");

exports.createProduct = async (req, res) => {
  try {
    let uploadeImage = req.files.file;
    let uploadPath =
      __dirname + "/../../client/public/uploads/" + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
      await Product.create({
        ...req.body,
        file: "/uploads/" + uploadeImage.name,
      });
      res.status(201).send(JSON.stringify({ status: "success" }));
    });
  } catch (error) {
    console.log(error);
    res.status(401).send(JSON.stringify({ status: "error", message: error }));
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(201).send(JSON.stringify({ status: "success" }));
  } catch (error) {
    console.log(error);
    res.status(401).send(JSON.stringify({ status: "error", message: error }));
  }
};

exports.createCategory = async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.body);
    let uploadeImage = req.files.file;
    let uploadPath =
      __dirname + "/../../client/public/uploads/" + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
      const category = await Category.create({
        ...req.body,
        file: "/uploads/" + uploadeImage.name,
      });
      res.status(201).send(JSON.stringify({ status: "success", category }));
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(JSON.stringify({ status: "error", message: error }));
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete({ slug: req.params.slug });
    res.status(201).send(JSON.stringify({ status: "success" }));
  } catch (error) {
    console.log(error);
    res.status(401).send(JSON.stringify({ status: "error", message: error }));
  }
};

exports.createType = async (req, res) => {
  try {
    let uploadeImage = req.files.file;
    let uploadPath =
      __dirname + "/../../client/public/uploads/" + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
      const type = await Types.create({
        ...req.body,
        file: "/uploads/" + uploadeImage.name,
      });
      res.status(201).send(JSON.stringify({ status: "success", type }));
    });
  } catch (error) {
    console.log(error);
    res.status(401).send(JSON.stringify({ status: "error", message: error }));
  }
};

exports.deleteType = async (req, res) => {
  try {
    await Types.findOneAndDelete({ slug: req.params.slug });
    res.status(201).send(JSON.stringify({ status: "success" }));
  } catch (error) {
    console.log(error);
    res.status(401).send(JSON.stringify({ status: "error", message: error }));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).send(JSON.stringify({ status: "success" }));
  } catch (error) {
    console.log(error);
    res.status(401).send(JSON.stringify({ status: "error", message: error }));
  }
};
