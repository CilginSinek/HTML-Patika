const router = require("express").Router();
const {
  addUser,
  editUser,
  deleteUser,
} = require("../controllers/apiController");

router.route("/add").post(addUser);
router.route("/edit").put(editUser);
router.route("/delete/:id").get(deleteUser);

module.exports = router;
