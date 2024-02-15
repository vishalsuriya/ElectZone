import React from "react";
import Home from "./Routes/Home";
import { Route ,Routes } from "react-router-dom";
import '../src/index.css';
import Login from "./Routes/Login";
import About from "./Routes/About";
import Contact from "./Routes/Contact";
import UserLogin from "./Components/UserLogin";
import UserSignup from "./Components/UserSignup";
import Cartpage from "./Components/Cartpage";
import CircleCard1 from "./Components/CircleCard1";
import CircleCard2 from "./Components/CircleCard2";
import CircleCard3 from "./Components/CircleCard3";
import CircleCard4 from "./Components/CircleCard4";
import CircleCard5 from "./Components/CircleCard5";
import { CartProvider } from "react-use-cart";
import BuyProducts from "./Components/BuyProducts";
function App() {
  return (
    <>
    <CartProvider>
    <Routes>
     <Route path="/" element ={<Home />}/>
     <Route path="/Login" element ={<Login />}/>
     <Route path="/About" element ={<About />}/>
     <Route path="/Contact" element ={<Contact />}/>
     <Route path="/UserLogin" element ={<UserLogin />}/>
     <Route path="/UserSignup" element ={<UserSignup/>}/>
     <Route path="/Cartpage" element ={<Cartpage/>}/>
     <Route path="/CircleCard1" element ={<CircleCard1/>}/>
     <Route path="/CircleCard2" element ={<CircleCard2/>}/>
     <Route path="/CircleCard3" element ={<CircleCard3/>}/>
     <Route path="/CircleCard4" element ={<CircleCard4/>}/>
     <Route path="/CircleCard5" element ={<CircleCard5/>}/>
     <Route path="/BuyProducts" element ={<BuyProducts/>}/>
    </Routes>
    </CartProvider>
    </>
  );
}

export default App;
