import React from 'react'
import Footer from '../Components/Footer';
import NavigationBar from '../Components/NavigationBar';
import CircleCard from '../Components/CircleCard';
import Slide from '../Components/Carousels';
import CardItems  from '../Components/CardItems';
function Home ()  {
  return (
    <div>
      <NavigationBar />
      <CircleCard />
       <Slide />
       <CardItems/>
        <Footer />
        </div>
  );
}
export default Home;