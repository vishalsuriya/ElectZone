import React from "react";
import Home from "./Routes/Home";
import { Route ,Routes } from "react-router-dom";
import '../src/index.css';
import Login from "./Routes/Login";
function App() {
  return (
    <>
    <Routes>
     <Route path="/" element ={<Home />}/>
     <Route path="/Login" element ={<Login />}/>
    </Routes>
    </>
  );
}

export default App;
