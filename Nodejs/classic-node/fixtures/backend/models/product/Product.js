const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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
  price: {
    type:Number,
    required:true,
  },
  file:{
    type:String,
    required: true,
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  reserves:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  ],
});


const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;