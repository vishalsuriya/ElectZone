import React from 'react';
import NavigationBar2 from '../Components/Header/NavigationBar2';
import Footer from '../Components/Footer/Footer';
import CircleCard from '../Components/Cards/CircleCard';
import Slide from '../Components/Carousels';
import CardItems  from '../Components/Cards/CardItems';
function Login() {
  return (
    <>
      <NavigationBar2 />
      <CircleCard />
      <Slide />
      <CardItems />
      <Footer />
    </>

  );
}

export default Login;
