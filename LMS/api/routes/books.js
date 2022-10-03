const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Book");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST main 
// router.put("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         const updatedPost = await Post.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: req.body,
//           },
//           { new: true }
//         );
//         res.status(200).json(updatedPost);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can update only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//UPDATE POST by me 
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
   
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST main
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         await post.delete();
//         res.status(200).json("Post has been deleted...");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can delete only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE POST by me for one book delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
   
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET POST main
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get borrowed book by me
// router.get("/", async (req, res) => {
//   const username = req.query.user;
//   const borrowedby = req.query.borrowedbook;
  
//   try {
//     let posts;
//     console.log('username', username);
//     console.log('borrowed by', borrowedby);
//     if (username) {
//       posts = await Post.find({ username });
//     }  else {
//       // posts = await Post.find();
//       console.log("nothing found")
//     }
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



//GET ALL books
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


//borrow book



router.post("/borrow/:id", async (req, res, next) => {
  //const newPost = new Post(req.body);
  console.log("borrow");
  try {
    const book = await Post.findOne({ username: req.body.username })
    // if (book == null) {
    //   return res.status(404).json({ error: "Book not found" })
    // }
    // if (book.borrowedBy.length === book.quantity) {
    //   return res.status(400).json({ error: "Book is not available" })
    // }
    // const user = await User.findById(req.body.username)
    // if (user != null) {
    //   return res.status(404).json({ error: "User not found" })
    // }

    console.log("borrow1",  req.body.username);
    if (Post.borrowedBy?.includes(User._id)) {
      return res.status(400).json({ error: "You've already borrowed this book" })
    }
    console.log("borrow2", Post.borrowedBy?.includes(User._id), Post.borrowedBy, User._id, book);
    // await book.update({ borrowedBy: [...book.borrowedBy, User._id] })
    // const updatedBook = await BookModel.findById(book.id)
    console.log("borrow3");
    // return res.status(200).json({
    //   book: {
    //     ...updatedBook.toJSON(),
    //    // availableQuantity: updatedBook.quantity - updatedBook.borrowedBy.length,
    //   },
      
    // })
    
  } catch (err) {
    console.log("problem");
    next(err)
  }
})




module.exports = router;