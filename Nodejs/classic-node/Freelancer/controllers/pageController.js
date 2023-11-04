const User = require("../models/User");

exports.IndexPage = async (req, res) => {
  const users = await User.find({});
  res.render("index", { users, selectedUser: null });
};

exports.EditPage = async (req, res) => {
  const users = await User.find({});
  const selectedUser = await User.findById(req.params.id)
  res.render("index", { users, selectedUser });
};
