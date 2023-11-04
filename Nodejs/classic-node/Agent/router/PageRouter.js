const express = require("express");
const { IndexPage, EditPage } = require("../controller/pageController");

const router = express.Router();

router.route("/").get(IndexPage);
router.route("/edit/:id").get(EditPage);

module.exports = router;