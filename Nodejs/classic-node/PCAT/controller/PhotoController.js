const Photo = require("../model/Photo");
const fs = require("fs");

exports.addPhoto = async (req, res) => {
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  try {
    const items = {
      name: req.body.title,
      dec: req.body.description,
    };
    let uploadeImage = req.files.image;
    let uploadPath = __dirname + "/../public/uploads/" + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
      await Photo.create({
        ...items,
        file: "/uploads/" + uploadeImage.name,
      });
      res.status(201).redirect("/");
    });
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.editPhoto = async (req, res) => {
  try {
    await Photo.findOneAndUpdate(
      { slug: req.params.name },
      { dec: req.body.dec, name:req.body.name }
    );
    res.redirect("/");
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    await Photo.findOneAndDelete({ slug: req.params.name });
  } catch (error) {
    res.status(201).render("/");
  }
};
