const User = require("../models/User");
module.exports = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!req.session.userID || !user) return res.status(401).json({status:"error",message:"You can't do that. Login!"});
  next();
};
