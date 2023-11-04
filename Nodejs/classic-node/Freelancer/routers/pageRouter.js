const { IndexPage, EditPage } = require("../controllers/pageController");

const router = require("express").Router();

router.route("/").get(IndexPage);
router.route("/edit/:id").get(EditPage);

module.exports = router;