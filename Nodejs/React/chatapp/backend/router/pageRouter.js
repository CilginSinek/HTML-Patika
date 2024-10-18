const { getIndexPage } = require("../controller/indexController");

const router = require("express").Router();

router.route("/").get(getIndexPage);

module.exports = router;