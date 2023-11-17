const {
  reserveProduct,
  unReserveProduct,
  sendMail,
} = require("../controllers/ProductController");
const {
  createProduct,
  createType,
  createCategory,
  deleteProduct,
  deleteType,
  deleteCategory,
  deleteUser,
} = require("../controllers/adminController");

const authRedirect = require("../middlewares/authRedirect");
const adminMid = require("../middlewares/adminMid");

const router = require("express").Router();

//* user
router.route("/reserve").put(authRedirect, reserveProduct);
router.route("/unreserve").put(authRedirect, unReserveProduct);
router.route("/mail").post(sendMail);

//* admin
router.route("/createProduct").post(adminMid, createProduct);
router.route("/createType").post(adminMid, createType);
router.route("/createCategory").post(adminMid, createCategory);

router.route("/deleteProduct/:id").delete(adminMid, deleteProduct);
router.route("/deleteType/:slug").delete(adminMid, deleteType);
router.route("/deleteCategory/:slug").delete(adminMid, deleteCategory);
router.route("/deleteUser/:id").delete(adminMid, deleteUser);

module.exports = router;
