const User = require("../models/User");

exports.starter = async (req, res, next) => {
  userIN = req.session.userID;
  if (req.session.userID) {
    const myuser = await User.findById(req.session.userID);
    userROLE = myuser.role;
    profileUrl = myuser.slug;
  } else {
    userROLE = "guest";
    profileUrl = null;
  }
  next();
};
