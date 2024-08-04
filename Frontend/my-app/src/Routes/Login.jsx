import React from 'react';
import NavigationBar2 from '../Components/Header/NavigationBar2';
import Footer from '../Components/Footer/Footer';
import CircleCard from '../Components/Cards/CircleCard';
import Slide from '../Components/Carousels';
import CardItems  from '../Components/Cards/CardItems';
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
