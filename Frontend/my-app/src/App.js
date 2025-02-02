import React from "react";
import Home from "./Routes/Home";
import { Route ,Routes } from "react-router-dom";
import '../src/index.css';
import Login from "./Routes/Login";
import UserLogin from "./Components/Users/UserLogin";
import UserSignup from "./Components/Users/UserSignup";
import Cartpage from "./Components/UserCart/Cartpage";
import CircleCard1 from "./Components/Cards/CircleCard1";
import CircleCard2 from "./Components/Cards/CircleCard2";
import CircleCard3 from "./Components/Cards/CircleCard3";
import CircleCard4 from "./Components/Cards/CircleCard4";
import CircleCard5 from "./Components/Cards/CircleCard5";
import UserProfile from "./Components/Users/UserProfile";
import Shipping from "./Components/BuyProducts/Shipping";
import ConfirmOder from "./Components/BuyProducts/ConfirmOrder";
import CheckOut from "./Components/BuyProducts/CheckOut";
import ProductPage from "./Components/ProductPage/ProductPage";
import PaymentSucess from "./Components/BuyProducts/PaymentSucess";
import UserOrders from "./Components/Users/UserOrders";
function App() {
  return (
    <>
    <Routes>
     <Route path="/" element ={<Home />}/>
     <Route path="/Login" element ={<Login />}/>
     <Route path="/ProductPage" element ={<ProductPage/>}/>
     <Route path="/UserLogin" element ={<UserLogin />}/>
     <Route path="/UserSignup" element ={<UserSignup/>}/>
     <Route path="/Cartpage" element ={<Cartpage/>}/>
     <Route path="/CircleCard1" element ={<CircleCard1/>}/>
     <Route path="/CircleCard2" element ={<CircleCard2/>}/>
     <Route path="/CircleCard3" element ={<CircleCard3/>}/>
     <Route path="/CircleCard4" element ={<CircleCard4/>}/>
     <Route path="/CircleCard5" element ={<CircleCard5/>}/>
     <Route path="/CheckOut" element ={<CheckOut/>}/>
     <Route path="/UserProfile" element ={<UserProfile  />}/>
     <Route path="/Shipping" element ={<Shipping/>}/>
     <Route path="/ConfirmOrder" element ={<ConfirmOder />}/>
     <Route path="/PaymentSucess" element = {<PaymentSucess />} />
     <Route path="/myOrders" element = {<UserOrders />} />
    </Routes>
    </>
  );
}

export default App;
