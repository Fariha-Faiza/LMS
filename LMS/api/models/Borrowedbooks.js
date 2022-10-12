const mongoose = require('mongoose');


const BorrowedBooksSchema = new mongoose.Schema({
  
    //user details
  
    // user: {

    //     type: mongoose.Schema.Types.ObjectId,
  
    //     required: true,
  
    //     ref: "User",
  
    //   },
    

      //book details
    title:{
        type: String,
        required: true,
        unique: false,
      },
      copyright:{
        type: String,
        required: true,
        unique: false,
      },
      price:{
        type: Number,
        required: true,
        unique: false,
      },
      quantity:{
        type: Number,
        required: true,
        unique: false,
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
      
    
      categories: {
        type: Array,
        required: false,
      },
  
    
  
  
  },
  {timestamps: true}
  
  );
  module.exports = mongoose.model("BorrowedBooks", BorrowedBooksSchema);