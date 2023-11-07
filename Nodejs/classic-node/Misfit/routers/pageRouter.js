const {
  IndexPage,
  getUser,
  getCourses,
  getCourse,
  aboutPage,
  getGallery,
  contactPage,
  loginPage,
  registerPage,
  addCoursePage,
  adminPage,
} = require("../controllers/pageController");
const authRedirect = require("../middlewares/authRedirect");
const redirectHome = require("../middlewares/redirectHome");

const router = require("express").Router();

router.route("/").get(IndexPage);
router.route("/about").get(aboutPage);
router.route("/gallery").get(getGallery);
router.route("/contact").get(contactPage)
router.route("/login").get(redirectHome,loginPage);
router.route("/register").get(redirectHome,registerPage);
router.route("/user/:slug").get(authRedirect,getUser);
router.route("/course").get(getCourses);
router.route("/course/:slug").get(getCourse);
router.route("/createCourse").get(authRedirect,addCoursePage);
router.route("/admin").get(authRedirect,adminPage);

module.exports = router;
