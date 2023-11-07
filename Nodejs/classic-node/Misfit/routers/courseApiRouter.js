const { enroleCourse, quitCourse, createCourse, mail } = require("../controllers/courseController");
const authRedirect = require("../middlewares/authRedirect");

const router = require("express").Router();

router.route("/mail").post(mail);
router.route("/enrole/:slug").get(authRedirect ,enroleCourse);
router.route("/quit/:slug").get(authRedirect ,quitCourse);
router.route("/createCourse").post(authRedirect ,createCourse);

module.exports = router;