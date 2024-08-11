import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Oders = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const queryParams = new URLSearchParams(location.search);
      const sessionId = queryParams.get('session_id');
      
      if (sessionId) {
        try {
          // Fetch order details from your server
          const response = await axios.get(`/api/orders/${sessionId}`);
          setOrderDetails(response.data);
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      }
    };

    fetchOrderDetails();
  }, [location.search]);

  return (
    <div>
      <h1>My Orders</h1>
      {orderDetails ? (
        <div>
          <h2>Order Details</h2>
          <p>Order ID: {orderDetails.sessionId}</p>
          <p>Date: {new Date(orderDetails.date).toLocaleDateString()}</p>
          <h3>Products</h3>
          <ul>
            {orderDetails.products.map((product, index) => (
              <li key={index}>
                {product.title} - Quantity: {product.quantity} - Price: ${product.price}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Oders;
