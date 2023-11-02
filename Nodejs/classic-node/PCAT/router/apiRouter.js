const express = require("express");
const {
  addPhoto,
  editPhoto,
  deletePhoto,
} = require("../controller/PhotoController");

const router = express.Router();

router.route("/add").post(addPhoto);
router.route("/edit/:name").put(editPhoto);
router.route("/delete/:name").delete(deletePhoto);

module.exports = router