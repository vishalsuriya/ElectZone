import React, { useState } from 'react'
import Footer from '../Components/Footer';
import NavigationBar from '../Components/NavigationBar';
import CircleCard from '../Components/CircleCard';
import Slide from '../Components/Carousels';
import Carditems2 from '../Components/Carditems2';
function Home ()  {
 
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