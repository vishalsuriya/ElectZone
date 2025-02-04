import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie"
function Cartslist() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const user = JSON.parse(Cookies.get("user"));
        const userId = user?.data?._id;
        if (userId) {
          const response = await axios.get(`https://electzone-server.onrender.com/api/users/userDetails/${userId}`);
          setData(response.data.cart);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      const user = JSON.parse(Cookies.get("user"));
      const userId = user?.data?._id;
      const response = await axios.delete(
        `https://electzone-server.onrender.com/api/users/${userId}/removeItem/${productId}`
      );
      if (response.data.message === "Item removed successfully") {
        setData(response.data.cart); 
      }
      setData(data.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  
  const handleClearCart = async () => {
    try {
      const user = JSON.parse(Cookies.get("user"));
      const userId = user?.data?._id;
      await axios.delete(`https://electzone-server.onrender.com/api/users/clearCart/${userId}`);
      setData([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
 const handleQuantityIncrease = async(productId)=>{
  try{
    const user = JSON.parse(Cookies.get("user"));
    const userId = user?.data?._id;
    const response = await axios.patch(`https://electzone-server.onrender.com/api/users/${userId}/increaseQuantity/${productId}`)
   if(response.data.message === "Quantity increased successfully"){
    setData(response.data.cart)
   }
  }catch(error){
    console.error("Error increasing quantity:",error)
  }
 }

 const handleQuantitydecrease = async(productId)=>{
  try{
    const user = JSON.parse(Cookies.get("user"));
    const userId = user?.data?._id;
    const response = await axios.patch(`https://electzone-server.onrender.com/api/users/${userId}/decreaseQuantity/${productId}`)
   if(response.data.message === "Quantity decreased successfully"){
    setData(response.data.cart)
   }
  }catch(error){
    console.error("Error increasing quantity:",error)
  }
 }
  return (
    <section className="py-4 container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h5>Cart total Items: {data.length}</h5>
          <table className="table table-light table-hover m-0">
            <tbody>
              {data.map((product, index) => (
                <tr key={index}>
                  <td>
                    <img src={product.imgsrc} alt={product.productName} style={{ height: '6rem' }} />
                  </td>
                  <td>{product.productName}</td>
                  <td>₹{product.price}</td>
                  <td>Quantity: {product.quantity}</td>
                  <td>
                    <button
                      className="btn btn-info ms-2"
                      onClick={() => handleQuantitydecrease(product.productId)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-info ms-2"
                      onClick={() => handleQuantityIncrease(product.productId)}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleRemoveItem(product.productId)}
                    >
                      Remove Item
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-auto ms-auto">
          <h2>Total Price: ₹{data.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h2>
        </div>
        <div className="col-auto">
          <button className="btn btn-danger m-2" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => navigate("/Shipping", { state: { data } })}
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cartslist;
