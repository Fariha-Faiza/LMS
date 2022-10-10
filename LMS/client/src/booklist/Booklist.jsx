import "./booklist.css"
import axios from "axios"
import React, { useState, useEffect, useContext } from "react";
import Addbook from '../addbook/Addbook'
import { Context } from "../context/Context"

import { Typography, TablePagination, } from "@mui/material"
// import BBLQ from "./borrowedBookList"
import BBL from "../bbl/BBL";


export default function Booklist() {
  //add book 
  //by using add book component(dialog)
  const [openAddbook, setOpenAddbook] = useState(false)  //add book dialog
  // const [openBookDetails, setOpenBookDetails] = useState(false) //show book details
  const [editbook, setEditBook] = useState(false)
  var [bookId, setBookId] = useState("")
  const [detail, setDetail] = useState(false)
  //pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
 
  const { user } = useContext(Context);
  const [userRole, setUserRole] = useState("")
  const [userId, setUserId] = useState("")
  //book list fetching from backend
  const [booklist, setBooklist] = useState([]);



  useEffect(() => {
    setUserRole(user.role)
    setUserId(user._id)
    // eslint-disable-next-line 
  }, [])


  const handleSubmit = (username, password) => {
    //  console.log(username, password);
    setOpenAddbook(false)
    setEditBook(false)
    setDetail(false)
  }

  const handleClose = () => {
    setOpenAddbook(false)
    setEditBook(false)
    // setOpenBookDetails(false)
    setDetail(false)
  }

  //// All the book list
  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/books")
      setBooklist(res.data)
    };
    getBooks()
  }, [])


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

      <h2 style={{ textAlign: "center" }}>Book List</h2>

      {userRole === 'admin' && <div color="inherit"
        onClick={() => { setOpenAddbook(true) }}>
        <i className="writeIcon fas fa-plus"></i>

      </div>}

      {booklist.length > 0 ?
        (<table >
          <thead>
            <tr>
              <th>index</th>
              <th>Title</th>
              <th>Author</th>
              {/* <th>Edition</th>
            <th>price</th> */}

              <th>Available copy</th>
              {/* <th>CopyRight</th>
            <th>Book Name</th>
            <th>Description</th> */}
              <th> Details</th>

              {userRole === 'admin' &&
                <th> Action</th>}

            </tr>
          </thead>
          {(rowsPerPage > 0
            ? booklist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : booklist
          ).map((c, index) => (
            <tr key={index}>
              <td> {(page * rowsPerPage) + index + 1}</td>
              <td>{c.title}</td>
              <td>{c.author}</td>
              {/* <td>{c.edition}</td>
            <td>{c.price}</td> */}
              <td> {c.quantity}</td>
              {/* <td>{c.copyright}</td>
            
              <td>{c.bookname}</td>
            <td>{c.desc}</td> */}
              <td >
                <button
                  value={c} variant="contained" onClick={(e) => { setBookId(c); setDetail(true) }}> View  </button>

              </td>
              {userRole === 'admin' &&
                <td>
                  <div className="singlePostEdit">
                    <i className="singlePostIcon far fa-edit" value={c} onClick={(e) => { setBookId(c); setEditBook(true); }}> </i>


                    <i className="singlePostIcon far fa-trash-alt" onClick={e => handleDelete(index, e)}></i>
                  </div>


                </td>}
            </tr>

          ))}
        </table>
        ) : (
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


      <h2 style={{ textAlign: "center" }}> My Borrowed Book  </h2>

        <BBL bookList={booklist} user_id={userId} />

      {/* <div style={{ padding: 20 }}>
        {borrowedBookbyUser}
      </div> */} 
        

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