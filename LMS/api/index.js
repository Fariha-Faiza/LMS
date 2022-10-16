const express = require('express');
const app = express();

// app.use("/lama", (req,res)=>{
//     console.log("hey is the main url");
// })
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const bookRoute = require("./routes/books");
const borrowRoute = require("./routes/borrowedbooks");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify:true
  })
  .then(console.log("connected to mongodb hello"))
  .catch((err)=> console.log(err));

 app.use("/api/auth", authRoute)
 app.use("/api/users", userRoute)
 app.use("/api/books", bookRoute)
 app.use("/api/borrow", borrowRoute)


 console.log("lama");
app.listen("5000" , ()=> {

    console.log("backend is running");
}
);

//app crash handler for wrong input 
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});