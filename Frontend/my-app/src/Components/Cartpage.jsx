import React from 'react'
import Cartslist from './Cartslist';
import { CartProvider } from 'react-use-cart';
function Cartpage ()  {
  return (
    <CartProvider>
    <>
      <Cartslist />
    </>
  </CartProvider>
  );
};
export default Cartpage;  
