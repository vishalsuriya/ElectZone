import React from 'react';
import NavigationBar2 from '../Components/NavigationBar2';
import Footer from '../Components/Footer';
import CircleCard from '../Components/CircleCard';
import Slide from '../Components/Carousels';
import { CardItems } from '../Components/CardItems';
function Login() {
  return (
    <div>
      <NavigationBar2 />
      <CircleCard />
      <Slide />
      <CardItems />
      <Footer />
    </div>
  );
}

export default Login;
