const {
  getHomePage,
  getCategory,
  getTypes,
  getProducts,
  getProduct,
  getBasket,
  getAdminPage,
  createPage,
} = require("../controllers/pageController");

const authRedirect = require("../middlewares/authRedirect");
const adminMid = require("../middlewares/adminMid");

const router = require("express").Router();

router.route("/home").get(getHomePage);
router.route("/fixtures").get(getCategory);
router.route("/fixtures/:category").get(getTypes);
router.route("/fixtures/:category/:type").get(getProducts);
router.route("/product/:id").get(getProduct);
router.route("/basket").get(authRedirect, getBasket);
router.route("/admin").get(adminMid, getAdminPage);
router.route("/createPage").get(adminMid, createPage);

module.exports = router;
