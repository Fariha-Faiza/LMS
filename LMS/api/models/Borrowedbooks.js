const mongoose = require("mongoose")



const BorrowedBooksSchema = new mongoose.Schema(

  {

    user: {

      type: mongoose.Schema.Types.ObjectId,



      required: true,



      ref: "User",

    },

    borrowedItems: [

      {

        name: { type: String, required: true, unique: false },

        author: { type: String, required: true },

        edition: { type: Number, required: true },

        borrowedBook: {

          type: mongoose.Schema.Types.ObjectId,

          required: true,

          ref: "Book",

        },

      },

    ],

  },

  { timestamps: true }

)

module.exports = mongoose.model("BorrowedBooks", BorrowedBooksSchema)