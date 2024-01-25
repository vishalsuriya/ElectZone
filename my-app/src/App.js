import React from "react";
import Home from "./Routes/Home";
import { Route ,Routes } from "react-router-dom";
import '../src/index.css';
import Login from "./Routes/Login";
import About from "./Routes/About";
import Contact from "./Routes/Contact";
function App() {
  return (
    <>
    <Routes>
     <Route path="/" element ={<Home />}/>
     <Route path="/Login" element ={<Login />}/>
     <Route path="/About" element ={<About />}/>
     <Route path="/Contact" element ={<Contact />}/>
    </Routes>
    </>
  );
}

export default App;
