const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Book");
const BorrowedBooks = require("../models/BorrowedBooks");

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
        res.status(200).json("Book has been deleted...");
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


// all borrowed book by id 
// router.post("/borrow", async (req, res) => {
//       const bookId = req.body.id;
//     console.log('backend borrowed list',  bookId)
//     try {
      
//       const post = await Post.findById(bookId);

//       // if(post.borrowedBy.includes(id))
//         console.log('post', post.borrowedBy)
//        res.status(200).json(post.borrowedBy);
    
//     } 
//     catch (err) {
//       res.status(500).json(err);
//     }
    
// })

router.post("/borrow", async (req, res) => {
  const borrowedBooks = new BorrowedBooks(req.body);
  try {
    const BorrowedBookList = await borrowedBooks.save();
    res.status(200).json(BorrowedBookList);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/borrow", async (req, res) => {
  const user = req.body.user;
  try {
    const BorrowedBookList = await BorrowedBooks.findById(user);
    res.status(200).json( BorrowedBookList);
    console.log("all okay");
  } catch (err) {
    res.status(500).json(err);
    console.log("error");
  }
})


module.exports = router;