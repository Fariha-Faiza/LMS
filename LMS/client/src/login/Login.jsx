// import { useState, forwardRef } from "react"
// import {
//     Button,
//     TextField,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Slide,
// } from "@mui/material"

// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />
// })

// export const Login = ({ open, handleClose, handleSubmit }) => {
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")

//     const onSubmit = (event) => {
        
//         event.preventDefault()
//         handleSubmit(username, password)
//         console.log(username, password);
//     }

//     const handleEnterKeyDown = (event) => {
//         if (event.key === "Enter") {
//             onSubmit(event)
//         }
//     }

//     return (
        
            
//         <Dialog
//             open={open}
//             TransitionComponent={Transition}
//             keepMounted
//             onClose={handleClose}
//             onKeyDown={handleEnterKeyDown}
//         >
//             <DialogTitle>Login</DialogTitle>
//             <DialogContent>
//                 <TextField
//                     autoFocus
//                     margin="dense"
//                     id="username"
//                     label="Username"
//                     type="text"
//                     fullWidth
//                     variant="standard"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <TextField
//                     margin="dense"
//                     id="password"
//                     label="Password"
//                     type="password"
//                     fullWidth
//                     variant="standard"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </DialogContent>
//             <DialogActions>
//                 <Button variant="text" onClick={handleClose}>
//                     Cancel
//                 </Button>
//                 <Button variant="contained" type="submit" onClick={onSubmit}>
//                     Submit
//                 </Button>
//             </DialogActions>
//         </Dialog>
        
//     )
// }
 
// export default Login;





// import { useState } from "react";
// import "./login.css";
// import axios from "axios";

// export default function Login() {
//     const [username, setUsername] = useState("")
//      const [password, setPassword] = useState("")
//      const [role, setRole] = useState("")

//      const handleSubmit = async (e) => {
//         e.preventDefault();
//         const res = await axios.post("auth/login", {
//             username,
//             password,
//             role
//      })
//      console.log('res', res);
        
//     }
//   return (
//     <div className="login">
//       <span className="loginTitle">Login</span>
//       <form className="loginForm"  onSubmit={handleSubmit}>
//         <label>Username</label>
//         <input className="loginInput" type="text" placeholder="Enter your email..." 
//           onChange={e=>setUsername(e.target.value)} />
//         <label>Password</label>
//         <input className="loginInput" type="text" placeholder="Enter your password..." 
//           onChange={e=>setPassword(e.target.value)} />
//         <label>Role</label>
//         <input className="loginInput" type="password" placeholder="Enter your role..."
//           onChange={e=>setRole(e.target.value)}  />
//         <button className="loginButton" type="submit" >Login</button>
//       </form>
//         <button className="loginRegisterButton">Register</button>
//     </div>
//   );
// }




import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);
  const arr= ['admin', 'user']

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
        role: roleRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
    console.log('see',user);
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
          {/* <label>Role</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your password..."
          ref={roleRef}
        /> */}


<label >Role</label>
         <select   ref={roleRef} className="registerInput">
         <option>
          --Choose and option--
        </option>
        {
        arr.map(item => {
          return <option key={item} value={item}>{item}</option>
        })
      }
      </select>





        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}