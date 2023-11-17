const { login, register, logout } = require("../controllers/authController");

const authRedirect = require("../middlewares/authRedirect");
const redirectHome = require("../middlewares/redirectHome");

const router = require("express").Router();

router.route("/login").post(redirectHome,login);
router.route("/register").post(redirectHome,register);
router.route("/logout").get(authRedirect,logout);

module.exports = router;
