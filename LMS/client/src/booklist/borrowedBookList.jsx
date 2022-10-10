import React from 'react'
import { useState, forwardRef, useContext } from "react"


export default function borrowedBookList(params) {
 ;
  

console.log(" params", params, params.bookList)
    function returnBookHandler (e){
        if(e){
            console.log(e.quantity, e._id);
         
         
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
                        params.bookList.map((b, i) => (
                            (b.borrowedBy.includes(params.user_id))
                            &&
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{b.bookname} </td>
                                    <td>{b.title}</td>
                                    <td>{b.author}</td>
                                    {/* <td>
                                        <button type=''  onClick={(e) => returnBookHandler(b._id)}> Return </button>
                                    </td> */}
                                      <td>
                                        <button type=''  onClick={(e) => returnBookHandler(b)}> Return </button>
                                    </td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
