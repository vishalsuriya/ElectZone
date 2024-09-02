import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Order.css'; 

const Orders = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();
  const [orderStatus, setOrderStatus] = useState([]);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      const queryParams = new URLSearchParams(location.search);
      const sessionId = queryParams.get('session_id');
      if (sessionId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/orders/${sessionId}`);
          setOrderDetails(response.data);
          setOrderStatus([
            { step: 'Ordered', completed: true },
            { step: 'Dispatched', completed: response.data.status >= 2 },
            { step: 'Out for Delivery', completed: response.data.status >= 3 },
            { step: 'Delivered', completed: response.data.status >= 4 },
          ]);
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      }
    };

    fetchOrderDetails();
  }, [location.search]);
console.log(orderDetails)
  return (
    <div className="order-container">
      <h1>My Orders</h1>
      {orderDetails ? (
        <div>
          <h2>Order Details</h2>
          <table className="order-table">
            <thead>
              <tr>
              <th>Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.products.map((product, index) => (
                <tr key={index}>
                    <td>
                    <img src={product.imgsrc} alt={product.title} height="50" width="50" />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.quantity || 1}</td>
                  <td>${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="order-status">
            <h3>Order Status</h3>
            <p><strong>Order ID:</strong> {orderDetails.sessionId}</p>
            <p><strong>Date:</strong> {new Date(orderDetails.date).toLocaleDateString()}</p>
            <div className="status-row">
              {orderStatus.map((status, index) => (
                <div key={index} className={`status-step ${status.completed ? 'completed' : ''}`}>
                  <div className="status-icon">
                    {status.completed ? '✔️' : '⬜️'}
                  </div>
                  <div className="status-text">
                    {status.step}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Orders;
