import React, { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
function Cartslist() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const userName = userInfo ? userInfo.name : '';
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const [cartData, setCartData] = useState({ userName: '', items: [] });

  useEffect(() => {
    setCartData({ userName, items });

    const uploadCartData = async () => {
      try {
        await axios.post('http://localhost:5000/api/users/usercart', cartData); 
      } catch (error) {
        console.error('Error uploading cart data:', error);
      }
    };

    uploadCartData();
  }, [items, userName]);

  if (isEmpty) return <h1 className='text-center'>Your cart is empty</h1>;
  return (
    <section className='py-4 container'>
      <div className='row justify-content-center'>
        <div className='col-12'>
          <h5>Cart ({totalUniqueItems}) total Items: ({totalItems})</h5>
          <table className='table table-light table-hover m-0'>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.imgsrc} style={{ height: '6rem' }} alt={item.title} />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>Quantity: {item.quantity}</td>
                  <td>
                    <button
                      className='btn btn-info ms-2'
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <button
                      className='btn btn-info ms-2'
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className='btn btn-danger ms-2'
                      onClick={() => removeItem(item.id)}
                    >
                      Remove Item
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-auto ms-auto'>
          <h2>Total Price: ${cartTotal.toFixed(2)}</h2>
        </div>
        <div className='col-auto'>
          <button className='btn btn-danger m-2' onClick={() => emptyCart()}>
            Clear Cart
          </button>
          <button
            className='btn btn-primary m-2'
            onClick={() => navigate('/Shipping', { state: { items } })}
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cartslist;
