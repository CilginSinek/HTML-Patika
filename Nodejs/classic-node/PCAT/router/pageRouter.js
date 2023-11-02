const express = require("express");
const {
  indexPage,
  aboutPage,
  contactPage,
  addPage,
  photoPage,
  editPage,
} = require("../controller/pageController");

const router = express.Router();

router.route("/").get(indexPage);
router.route("/about").get(aboutPage);
router.route("/contact").get(contactPage);
router.route("/add").get(addPage);
router.route("/photo/:name").get(photoPage);
router.route("/edit/:name").get(editPage);

module.exports = router;
