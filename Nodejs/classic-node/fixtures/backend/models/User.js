const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  reserved:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
    }
  ],
  role: {
    type: String,
    default: "User",
    enum: ["User", "Admin"],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
