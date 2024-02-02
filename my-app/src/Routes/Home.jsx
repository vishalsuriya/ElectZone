import React from 'react'
import Footer from '../Components/Footer';
import NavigationBar from '../Components/NavigationBar';
import CircleCard from '../Components/CircleCard';
import Slide from '../Components/Carousels';
function Home ()  {
  return (
    <div>
      <NavigationBar />
      <CircleCard />
       <Slide />
        <Footer />
        </div>
  );
}
export default Home;