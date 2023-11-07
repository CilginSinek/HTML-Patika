const User = require("../models/User");
const Course = require("../models/Course");
const fs = require("fs");

exports.IndexPage = (req, res) => {
  res.render("index", { page: "home" });
};
exports.aboutPage = (req, res) => {
  res.render("about", { page: "about" });
};
exports.contactPage = (req, res) => {
  res.render("contact", { page: "contact" });
};
exports.registerPage = (req, res) => {
  res.render("register", { page: "register" });
};
exports.loginPage = (req, res) => {
  res.render("login", { page: "login" });
};
exports.getUser = async (req, res) => {
  const user = await User.findOne({ slug: req.params.slug }).select(
    "-password"
  );
  if (user.role === "Trainer") {
    const courses = await Course.find({ author: user._id });
    res.render("user", { user: user, courses, page: "" });
  } else {
    const popuser = await user.populate("courses");
    res.render("user", { user: popuser, courses: popuser.courses, page: "" });
  }
};
exports.getCourses = async (req, res) => {
  const courses = await Course.find({}).populate("author", "+name");
  res.render("Courses", { courses, page: "course" });
};
exports.getCourse = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug }).populate(
    "author",
    "-password"
  );
  const user = await User.findById(req.session.userID);
  res.render("Course", { course, user, page:"courses" });
};
exports.getGallery = (req, res) => {
  const Folder = "./public/uploads/";
  const galleryArr = [];

  fs.readdirSync(Folder).forEach((file) => {
    const url = `/uploads/${file}`;
    galleryArr.push(url);
  });
  res.render("gallery", { gallery: galleryArr, page: "gallery" });
};
exports.addCoursePage = async (req, res) => {
  const userID = await User.findById(req.session.userID)._id;
  res.render("newcourse", { page: "newcourse", userID });
};
exports.adminPage = async (req, res) => {};
