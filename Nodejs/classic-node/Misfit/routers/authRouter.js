const { login, register, logout } = require("../controllers/authController");
const authRedirect = require("../middlewares/authRedirect");

const router = require("express").Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(authRedirect, logout);

module.exports = router;