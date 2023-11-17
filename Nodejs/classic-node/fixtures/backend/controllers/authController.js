const User = require("../models/User");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      req.session.userID = user._id;
      res.status(202).json(user);
    } else {
      throw "Wrong Password of Email";
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.register = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({status:"success"});
  } catch (error) {
    console.log(error)
    res.status(400).json({error});
  }
};
exports.logout = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(201).send(JSON.stringify({ status: "success" }));
    });
  } catch (error) {
    res.status(401).send(error);
  }
};
