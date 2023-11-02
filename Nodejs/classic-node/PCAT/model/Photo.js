const mongoose = require("mongoose");
const slugify = require('slugify');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  dec: {
    type: String,
    required: true,
    trim: true,
  },
  file: {
    type: String,
    required: true,
  },
  timeCreate: {
    type: Date,
    default: Date.now,
  },
  slug:{
    type:String,
    unique:true
  }
});

PhotoSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Photo = mongoose.model("Photo", PhotoSchema);
module.exports = Photo;
