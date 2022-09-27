// import React from 'react'

// export default function BookDetails() {
//   return (
//     <div>
      
//     </div>
//   )
// }
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

import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';



import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export const BookDetails = ({ open, handleClose, handleSubmit, bookData, action }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [copyright, setCopyright] = useState("");
  var [books, setBooks] = useState("");
  const { user } = useContext(useContext);


  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
        handleSubmit(event)
    }
}

  return (
        
          
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            onKeyDown={handleEnterKeyDown}
        >   
             <DialogTitle>Book Details</DialogTitle>
           

          </Dialog>

      
      )

}
export default BookDetails;