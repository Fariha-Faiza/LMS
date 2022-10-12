import React, { useEffect } from 'react'
import { useState } from "react"
import axios from "axios"

export default function BBL(params) {
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
    var [borrowlist, setborrowlist] =  useState([]);
 

    useEffect(() => {
        // console.log(bookData);
         (params)&&
 
             setTitle(params.title);
             setDesc(params.desc);
             setBookname(params.bookname);
             setAuthor(params.author);
             setEdition(params.edition);
             setPrice(params.price);
             setQuantity(params.quantity);
             setCopyright(params.copyright);
             setBorrowedBy(params.borrowedBy);
             setUserRole(params.role)
         
     }, [userRole]);

     const handleReturnBook = async (index, e) => {
        console.log('hiii',  e);
        borrowlist = params.bookList.filter((b, i) => (
            (b.borrowedBy.includes(params.user_id))))
        console.log('borrowlist', borrowlist)
        const res = await axios.post("/books/borrow", borrowlist);
        setborrowlist(borrowlist.filter((v, i) => i !== index));
        window.location.replace("/");
      
        
      }

    function returnBookHandler (e){
        if(e){
           
        

        console.log(e);
    }

    }

  return (
    <div>
   <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Book Name </th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        params.bookList.map((b,i) => (
                            (b.borrowedBy.includes(params.user_id))
                            &&
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{b.title}</td>
                                    <td>{b.bookname} </td>
                                     <td>{b.author}</td>
                                    {/* <td>
                                        <button type=''  onClick={(e) => returnBookHandler(b)}> Return </button>
                                    </td> */}
                                     <td>
                                        <button type=''  onClick={(e) => handleReturnBook(b)}> Return </button>
                                    </td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>


    </div>
  )
}
