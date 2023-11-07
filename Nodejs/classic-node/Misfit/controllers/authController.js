const User = require("../models/User");

exports.login = async (req,res)=>{
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (user && user.password === password) {
          req.session.userID = user._id
          res.status(200).redirect("/")
        }else{
          throw "Wrong Password of Email"
        }
      } catch (error) {
        res.status(400).redirect("/login")
      }
}

exports.register = async (req,res)=>{
  try{
    await User.create(req.body);
    res.status(201).redirect("/login");
  }catch(error){
    res.status(404).send(error)
  }
}
exports.logout = async (req,res)=>{
  try{
    req.session.destroy(()=> {
      res.redirect('/');
    })
  }catch(error){
    res.status(401).send(error)
  }
}