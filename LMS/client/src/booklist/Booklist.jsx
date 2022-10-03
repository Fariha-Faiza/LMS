import "./booklist.css"
import axios from "axios"
import { useState } from "react"
import { useEffect, useRef, useContext } from "react";
import * as React from 'react';
import Addbook from '../addbook/Addbook'
import { Context } from "../context/Context"

import  {Typography,    TablePagination,} from "@mui/material"


export default function Booklist() {
  //add book 
  //by using add book component(dialog)
  const [openAddbook, setOpenAddbook] = React.useState(false)  //add book dialog
  const [openBookDetails, setOpenBookDetails] = React.useState(false) //show book details
  const [editbook, setEditBook] = React.useState(false)
  var [bookId, setBookId] = React.useState("")
  const [detail, setDetail] = React.useState(false)
  //pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

var [borrowedBooklist, setBorrowedBooklist]= useState([]);
  var [borrowedBookbyUser, setBorrowedBookbyUser] = useState([]);
    

const { user } = useContext(Context);
const [userRole, setUserRole] = useState("")
const [userId, setUserId] = useState("")
 //book list fetching from backend
 const [booklist, setBooklist] = useState([]);
 const [userInfo, setUserInfo] = useState([]);
 

 // console.log(openAddbook,editbook);
 
useEffect(() => {
 console.log("borrowedBooklist", borrowedBooklist, borrowedBookbyUser)
 console.log('user', user);
 setUserRole(user.role);
 setUserId(user._id)


 console.log('userRole', userRole);
 console.log('userID', userId);



},[userRole,userId ])




  const handleSubmit = (username, password) => {
    //  console.log(username, password);
    setOpenAddbook(false)
    setEditBook(false)
    setDetail(false)
    

  }
  const handleClose = () => {
    setOpenAddbook(false)
    setEditBook(false)
    setOpenBookDetails(false)
    setDetail(false)
  }
 
  




  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/books")
      // setUser(res.data)
     // console.log("hello", res.data);
      // console.log(booklist[5]._id);
     // borrowedBooklist= (booklist.filter(b=>b.borrowedBy.length!==0));
      setBooklist(res.data)

      // this.setTest({ myArray: this.test.myArray.push('new value') })
      // console.log(test);

    //  borrowedBooklist= booklist.map(b=>b.borrowedBy.length!==0);
  //  borrowedBooklist =  setBorrowedBooklist(booklist.map(b=>b.borrowedBy.length!==0));
     //  console.log(borrowedBooklist);

      //  borrowedBookbyUser = borrowedBooklist.map(b => b.borrowedBy.includes('faizamoni'))

        //  borrowedBookbyUser.map((e)=>
        //  {
        //     (e === true) && setFBooklist({...Fbooklist, e})
            
        //  })
         
  
      // { if(b.borrowedBy.includes('faizamoni')){
      //          console.log('hello');
      //  }
    //  }
      //)
     // setBorrowedBookbyUser(borrowedBookbyUser);

    };
    getBooks()
  }, [])

  //borrowedbooklist
  useEffect(() => {
  const getBorrowedBooks= async () => {
   
    const res = await axios.get(`/users/borrowbooklist/${user._id}`)
    borrowedBooklist =  booklist.filter(b=>b.borrowedBy.length!==0); //all borrowed books
    borrowedBookbyUser =  borrowedBooklist.filter(b => b.borrowedBy.includes(user._id))
    setUserInfo(res.data);
    setBorrowedBookbyUser(borrowedBookbyUser)
   // console.log('result11111111111111111', res.data.borrowedBook,  borrowedBooklist, borrowedBookbyUser);
  };
  getBorrowedBooks()
  
  }, [borrowedBookbyUser])

//console.log('hey', borrowedBookbyUser)
  //delete book
  const handleDelete = async (index, e) => {

    setBooklist(booklist.filter((v, i) => i !== index));
    try {
      const res = await axios.delete(`/books/${booklist[index]._id}`, {
      })

      console.log('delete', res.data);
    } catch (err) { }
  }

  return (
    <div>
     
        <h2 style={{textAlign: "center"}}>
          
            Book List
          
          </h2>
            
          {userRole=== 'admin'&&  <div color="inherit"
        onClick={() => { setOpenAddbook(true) }}>
        <i className="writeIcon fas fa-plus"></i>

      </div>}
    

          {booklist.length>0 ? 
          (<table >
            <thead>
          <tr>
            <th>index</th>
            <th>Book Name</th>
            <th>Author</th>
            {/* <th>Edition</th>
            <th>price</th> */}
          
            <th>Available copy</th>
            {/* <th>CopyRight</th>
            <th>Title</th>
            <th>Description</th> */}
            <th> Details</th>

            {userRole=== 'admin'&&
            <th> Action</th>}

          </tr>
          </thead>
          { (rowsPerPage > 0
                                        ? booklist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : booklist
                                    ).map((c, index) => (
          <tr key={index}>
            <td> {(page * rowsPerPage)+index + 1}</td>
            <td>{c.bookname}</td>
            <td>{c.author}</td>
            {/* <td>{c.edition}</td>
            <td>{c.price}</td> */}
            <td> {c.quantity}</td>
            {/* <td>{c.copyright}</td>
            <td>{c.title}</td>
            <td>{c.desc}</td> */}
            <td >
              <button
            value={c}  variant="contained" onClick={(e) => { setBookId(c); setDetail(true) }}> View  </button>
             
            </td>
            {userRole=== 'admin'&&
            <td>
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" value={c} onClick={(e) => { setBookId(c); setEditBook(true); }}> </i>


                <i className="singlePostIcon far fa-trash-alt" onClick={e => handleDelete(index, e)}></i>
              </div>


            </td>}
          </tr>

        ))} 
      </table>
          ):(
          <div> 
            <Typography variant="h5">No books found!</Typography>

            </div>
          )}
           <TablePagination
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10))
                                setPage(0)
                            }}
                            component="div"
                            count={booklist.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />


        <h2 style={{textAlign: "center"}}> My Borrowed Book  </h2>
        <table>
          <tr>
            <th>index</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Edition</th>
            <th>price</th>
          
            <th>Available copy</th>
            <th>CopyRight</th>
            <th>Title</th>
            <th>Description</th>
            <th> Details</th>
            <th> Action</th>

          </tr>
          {(borrowedBookbyUser.map((c, index) => (
          <tr key={index}>
            <td> {index + 1}</td>
            <td>{c.bookname}</td>
            <td>{c.author}</td>
            <td>{c.edition}</td>
            <td>{c.price}</td>
            <td> {c.quantity}</td>
            <td>{c.copyright}</td>
            <td>{c.title}</td>
            <td>{c.desc}</td>
            <td > </td>
              </tr>)))}
          </table>
          
      {(openAddbook === true) &&
        <Addbook
          open={openAddbook}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          bookData=""
          action="create"

        />
      }
      {(editbook === true) &&
        <Addbook
          open={editbook}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          bookData={bookId}
          action="edit"

        />
      }
      {(detail === true) &&
        <Addbook
          open={detail}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          bookData={bookId}
          action="detail"

        />
      }
 


    </div>


  )


}