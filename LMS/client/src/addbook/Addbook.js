import { useState, forwardRef, useContext } from "react"
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
} from "@mui/material"
import { Context } from "../context/Context"
import axios from "axios"
import { useEffect } from "react"
import "./addbook.css"


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export const Addbook = ({ open, handleClose, handleSubmit, bookData, action }) => {
    const [userId, setUserId] = useState("")
    const [username, setUsername] = useState("")
    const [userRole, setUserRole] = useState("")
    // const [password, setPassword] = useState("")
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [bookname, setBookname] = useState("");
    const [author, setAuthor] = useState("");
    const [edition, setEdition] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [copyright, setCopyright] = useState("");
    var [borrowedBy, setBorrowedBy] = useState([]);
    // let borrowedBy = [""];
    var [book, setBook] = useState("");
    const { user } = useContext(Context);
     // const [file, setFile] = useState(null);

    useEffect(() => {
       // console.log(bookData);
        (bookData)&&

            setTitle(bookData.title);
            setDesc(bookData.desc);
            setBookname(bookData.bookname);
            setAuthor(bookData.author);
            setEdition(bookData.edition);
            setPrice(bookData.price);
            setQuantity(bookData.quantity);
            setCopyright(bookData.copyright);
            setBorrowedBy(bookData.borrowedBy);
            setUserRole(user.role)
        
    }, [userRole]);

   console.log('userdetail', userRole);
//console.log(borrowedBy);
    // new book create
    handleSubmit = async (e) => {
    e.preventDefault()
        // handleSubmit(title, desc, bookname, author, edition,price, copyright)
        // console.log(title, desc, bookname, author, edition,price, copyright);
        const newPost = {
            userId: user._id,
            username: user.username, title, desc, bookname, author, edition, price, copyright, quantity,
        };
        const res = await axios.post("/books", newPost);
        //console.log('BOOKS', res.data);
        setBook(res.data);
        window.location.replace("/");
    };


   //Edit book 
   const handleUpdate = async ( e) => {
 // console.log('update', e);
    try {
      const res =  await axios.put(`/books/${bookData._id}`, {
        userId: user._id,
        username: user.username ,
        title, desc, bookname, author, edition, price, copyright, quantity
      })
      window.location.replace("/");
     // console.log('update', res.data);
      //window.location.replace("/");
    } catch (err) { }
  }

    // console.log(books);

    const handleEnterKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit(event)
        }
    }


    //borrow book
    const handleBorrow = async ( e) => {
      //  console.log('borrow', e);
          try {
              setUserId(user._id);
              setUsername(user.username);
              setBorrowedBy([...borrowedBy, user._id]);
              setQuantity(quantity-1)
             window.location.replace("/");
          }
          catch (err) { }
        }

        const handleReturnBook = async ( e) => {
      
            try {
                setUserId(user._id);
                setUsername(user.username);
               
                setBorrowedBy(borrowedBy.filter(item => item!== user._id));
                
                setQuantity(quantity+1)
                window.location.replace("/");
            }
            catch (err) { }
          }
             
        
      useEffect(() => {
            const borrowBook = {
                userId: userId,
                username: username ,
            title, desc, bookname, author, edition, price, copyright,
            quantity,
            borrowedBy: borrowedBy,
            };

          const res = axios.put(`/books/${bookData._id}`, borrowBook)  
       
          console.log('borrow', res.data, borrowBook );
        }, [author, bookData._id, bookname, borrowedBy, copyright, desc, edition, price, quantity, title, username])
    
       console.log(quantity );



       //return book
     




    return (


        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            onKeyDown={handleEnterKeyDown}
        >   

            {
                
                    (action=== "detail") ?(
                        <div className="dialog-title">
                        <DialogTitle>Detail of {bookData.bookname}
                           
                           <Button
                           onClick={handleClose}
                           >
                               
                               
                                 cross</Button>
                        
                         </DialogTitle>
                       
                    </div>

                    )
                   :
                   (action === "edit") ? 
                    
                        (<DialogTitle className="dialog-title">Edit {bookData.bookname} book</DialogTitle>)
                       
                    :
                    (<div>
                        <DialogTitle className="dialog-title">Add new book</DialogTitle>
                        </div>)

                }
                   {(action === "edit" || action === "create")?
                    
                        (<DialogContent>


                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="description"
                                label="Discription"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="bookname"
                                label="Bookname"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={bookname}
                                onChange={(e) => setBookname(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="author"
                                label="Author"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="edition"
                                label="Edition"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={edition}
                                onChange={(e) => setEdition(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="price"
                                label="Price"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                              <TextField
                                margin="dense"
                                id="quantity"
                                label="Quantity"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="copyright"
                                label="Copyright"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={copyright}
                                onChange={(e) => setCopyright(e.target.value)}
                            />
                        </DialogContent>)
                        :(
                            <div className="dialog-box">
                              <table id="table1">
                              <tr>
                                  <th>Title</th>
                                  <td> {title}</td>
                                  </tr>
                                  <tr>
                                  <th>Bookname</th>
                                  <td> {bookname}</td>
                                  </tr>
                                  <tr>
                                  <th>Author</th>
                                  <td> {author}</td>
                                  </tr>
                                  <tr >
                                  <th style={{color: "red"}}>Description</th>
                                  <td className="justify descSize" > {desc}</td>
                                  </tr>
                                  <tr>
                                  <th>Copyright</th>
                                  <td> {copyright}</td>
                                  </tr>
                                  <tr>
                                  <th>Available Copy</th>
                                  <td> {quantity}</td>
                                  </tr>
                                  
                              </table>
                             

                            </div>
                        )
}
                        <DialogActions>
                        {(action === "edit" || action === "create") ?
               ( <Button
                variant="text" 
                onClick={handleClose}>
                Cancel
                </Button>):
                 (userRole === "user")?
                <Button
                variant="contained" 
                onClick={handleReturnBook}
                disabled={ quantity<1 ||borrowedBy.includes(user._id)=== false}
                >
                Return Back</Button>:

<Button
variant="contained" 
onClick={handleClose}>


                        
Cancle</Button>

                }
                {
                (action === "edit") ? (
                   
                    <Button variant="contained"  onClick={handleUpdate}>
                   Update
                </Button>
                 )  :
                
                 (action=== "detail") && (userRole=== 'user') ? (
                 <Button variant="contained" 
                     onClick={handleBorrow}
                     disabled={quantity<1 || borrowedBy.includes(user._id)}
                     >
                   Borrow
                </Button>)
                    :
                   (action=== "create")?
                <Button variant="contained" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>:
                <Button> </Button>
                 }
            </DialogActions>
                


            

            
        </Dialog>

    )
}
export default Addbook;

