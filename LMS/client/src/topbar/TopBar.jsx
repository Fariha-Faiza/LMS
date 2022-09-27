
// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import  Login   from '../login/Login';
// import { Link } from "react-router-dom";





// export default function TopBar() {
//   const [openLogin, setOpenLogin] = React.useState(false)
 

//   const handleLoginSubmit = (username, password) => {
//   //  console.log(username, password);
//    setOpenLogin(false)
//   }
//   const handleLoginClose = () => {
//       setOpenLogin(false)
//   }
  
  
//   return (
//    <div>
//      <button >
//      <Link  className="link" to="/register">Register</Link>
//      </button>
   
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//            Library Management System
//           </Typography>

//           <Button 
//           color="inherit"
//           onClick={() => {setOpenLogin(true)}}>Login
//           </Button>
//          <button >
//      <Link  className="link" to="/register">Register</Link>
//      </button>
   

        
        

      
//         </Toolbar>
//       </AppBar>
//     </Box>
//     <Login
//                 open={openLogin}
//                 handleSubmit={handleLoginSubmit}
//                 handleClose={handleLoginClose}
//             />

           
//     </div>
   
         
//   );


// }
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "./topbar.css";

export default function Topbar() {
  const{ user, dispatch} = useContext(Context)
  const handleLogout = () =>{
   dispatch({
      type: "LOGOUT",
    });

  }
 
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
         
          <li className="topListItem" onClick={handleLogout}>
        {user &&  "LOGOUT"}</li>

        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            {/* <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            /> */}
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}