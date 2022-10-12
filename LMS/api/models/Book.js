const mongoose = require('mongoose');
var Schema = mongoose.Schema
const BookSchema = new mongoose.Schema({
  
  title:{
      type: String,
      required: true,
      
    },
    copyright:{
      type: String,
      required: true,
      // unique: false,
    },
    price:{
      type: Number,
      required: true,
      // unique: false,
    },
    quantity:{
      type: Number,
      required: true,
      // unique: false,
    },
    borrowedBy: { 
       type: Array,
       required: false,
       },
    bookname:{
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    edition:{
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    // username: {
    //   type: String,
    //   required: true,
    // },
  
    categories: {
      type: Array,
      required: false,
    },

  


},
{timestamps: true}

);
module.exports = mongoose.model("Book", BookSchema);