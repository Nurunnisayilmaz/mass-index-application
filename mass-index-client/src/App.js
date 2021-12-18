import React,{userState} from "react";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Homepage from "./components/homepage/Homepage";

function App() {
  return (
     <div className="App">
         <Login/>
         <Homepage/>
         <Register/>
     </div>
  );
};

export default App;
