import TopBar from "./topbar/TopBar";
import Booklist from "./booklist/Booklist";
import {  Route, } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes 
} from "react-router-dom";
import Register from "./register/Register";
import Login from "./login/Login";
import { useContext } from "react";
import { Context } from "./context/Context";
//import Addbook from "./addbook/Addbook";


function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
      
      <Router>
     <TopBar/>
     {/* <Addbook/> */}
     {/* <Booklist/> */}
     {/* <Login/> */}
     
     <Routes>
     <Route  path="register" element={<Register/>}></Route>
     <Route  path="login" element={user ? <Booklist /> : <Login />}></Route>
      <Route exact path="/" element={<Booklist/>}></Route> 
     {/* <Route  path="booklist" element={<Booklist/>}></Route> */}


     </Routes>
  
     </Router>
    </div>
  );
}

export default App;
