const Course = require("../models/Course");
const User = require("../models/User");
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.enroleCourse = async (req, res) => {
  const user = await User.findById(req.session.userID);
  const courseId = await Course.findOne({ slug: req.params.slug });
  if (user.courses.includes(courseId._id)) {
    res.status(404).send("Course Already enroled");
  } else {
    user.courses.push({ _id: courseId._id });
    await user.save();
    res.status(201).redirect(`/course/${req.params.slug}`);
  }
};
exports.quitCourse = async (req, res) => {
  const user = await User.findById(req.session.userID);
  const courseId = await Course.findOne({ slug: req.params.slug });
  if (!user.courses.includes(courseId._id)) {
    res.status(404).send("Course Already Quited");
  } else {
    user.courses.pull({ _id: courseId._id });
    await user.save();
    res.status(201).redirect(`/course/${req.params.slug}`);
  }
};
exports.createCourse = async (req, res) => {
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  try {
    let uploadeImage = req.files.file;
    let uploadPath = __dirname + "/../public/uploads/" + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
      await Course.create({
        ...req.body,
        author: req.session.userID,
        file: "/uploads/" + uploadeImage.name,
      });
      res.status(201).redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
exports.mail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERMAIL,
      pass: process.env.USERPASS,
    },
  });

  await transporter
    .sendMail({
      from: `"${req.body.name}" <${process.env.USERMAIL}>`, // sender address
      to: `${process.env.USERMAIL}, ${req.body.email}`, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
    })
    .then(() => res.status(201).redirect("/"))
    .catch((error) => res.status(404).send(error));
};
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    // Kursu silmek istediğiniz tüm kullanıcıları bulun
    const usersToUpdate = await User.find({ courses: course._id });

    // Her bir kullanıcının courses dizisinden kursu kaldırın ve kaydedin
    for (const user of usersToUpdate) {
      user.courses = user.courses.filter(
        (course) => course.toString() !== courseId
      );
      await user.save();
    }
    await Course.findByIdAndDelete(req.params.id);
    res.status(201).redirect("/admin");
  } catch (error) {
    res.status(400).redirect("/admin");
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.role === "Trainer") {
      await Course.deleteMany({ author: user._id });
    }
    await User.findOneAndDelete({ _id: user._id });
    res.status(201).redirect("/admin");
  } catch (error) {
    res.status(400).redirect("/admin");
  }
};
