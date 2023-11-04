const express = require("express");
const {
  addPortfolio,
  editPortfolio,
  deletePortfolio,
} = require("../controller/apiController");

const router = express.Router();

router.route("/add").post(addPortfolio);
router.route("/edit").put(editPortfolio);
router.route("/delete/:id").delete(deletePortfolio);

module.exports = router;
