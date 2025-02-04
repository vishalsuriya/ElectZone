import React, { useEffect } from 'react'
import Footer from '../Components/Footer/Footer';
import NavigationBar from '../Components/Header/NavigationBar';
import CircleCard from '../Components/Cards/CircleCard';
import Slide from '../Components/Carousels';
import Carditems2 from '../Components/Cards/Carditems2';
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie";
function Home ()  {
  const navigate = useNavigate();
 useEffect(()=>{
  const user = Cookies.get("user");
  if(user){
    navigate("/Login")
  }
 })
  return (
    <div>
      <NavigationBar />
      <CircleCard />
       <Slide />
       <Carditems2 />
        <Footer />
        </div>
  );
}
export default Home;