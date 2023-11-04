const fs = require("fs");
const User = require("../models/User");

exports.addUser = (req, res) => {
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const items = {
    name: req.body.name,
    email: req.body.email,
    dec: req.body.dec,
  };
  let uploadeImage = req.files.file;
  let uploadPath = __dirname + "/../public/uploads/" + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await User.create({
      ...items,
      file: "/uploads/" + uploadeImage.name,
    });
    res.status(201).redirect("/");
  });
};

exports.editUser = async (req, res) => {
  try {
    const items = req.body;
    delete items.id;
    await User.findByIdAndUpdate(req.body.id, items);
    res.status(202).redirect("/");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(202).redirect("/");
  } catch (error) {
    res.status(400).send(error);
  }
};
