const Photo = require("../model/Photo");

exports.indexPage = async (req, res) => {
  const photos = await Photo.find({});
  res.render("index",{photos});
};

exports.aboutPage = (req, res) => {
  res.render("about");
};

exports.contactPage = (req, res) => {
  res.render("contact");
};

exports.photoPage = async (req, res) => {
  try {
    const photo = await Photo.findOne({ slug: req.params.name });
    res.status(200).render("photo", { photo });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.addPage = (req, res) => {
  res.render("add");
};

exports.editPage = async (req,res)=>{
  try {
    const photo = await Photo.findOne({ slug: req.params.name });
    console.log(photo)
    res.status(200).render("edit", { photo });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
}
