const router = require("express").Router() 
const BorrowedBooks = require("../models/BorrowedBooks")

router.post("/books", async (req, res) => {

    const { borrowedItems } = req.body
//    console.log("borrowedItems", borrowedItems)
//    console.log("body", req.body)
    try {
  
      const borrowedBookList = new BorrowedBooks({
  
        user: req.headers.id,
  
        borrowedItems,
  
      })
  
      console.log("borrowedBookList: ", borrowedBookList);
      const createBorrowedBookList = await borrowedBookList.save();
      console.log("createBorrowedBookList", createBorrowedBookList);
      res.status(201).json(createBorrowedBookList)
  
    } catch (err) {
  
      res.status(500).json(err)
  
    }
  
  })

router.get("/books", async (req, res)=> {
  
    const borrowedList = await BorrowedBooks.find({user: req.headers.id})
    console.log("found");
    res.json(borrowedList)
})

module.exports = router 