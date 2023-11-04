const Portfolio = require("../model/Portfolio");
const fs = require("fs");

exports.addPortfolio = async (req, res) => {
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
    await Portfolio.create({
      ...items,
      file: "/uploads/" + uploadeImage.name,
    });
    res.status(201).redirect("/");
  });
};

exports.editPortfolio = async (req, res) => {
  try {
    const items = { ...req.body };
    delete items.id;
    await Portfolio.findByIdAndUpdate(req.body.id, { ...items });
    res.redirect("/");
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(400).send(err);
  }
};
