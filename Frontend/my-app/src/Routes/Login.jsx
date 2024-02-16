import React from 'react';
import NavigationBar2 from '../Components/NavigationBar2';
import Footer from '../Components/Footer';
import CircleCard from '../Components/CircleCard';
import Slide from '../Components/Carousels';
import CardItems  from '../Components/CardItems';
import {CartProvider } from 'react-use-cart';
function Login() {
  return (
    <>
    <CartProvider>
    <div>
      <NavigationBar2 />
      <CircleCard />
      <Slide />
      <CardItems />
      <Footer />
    </div>

    </CartProvider>
    </>

  );
}

export default Login;
