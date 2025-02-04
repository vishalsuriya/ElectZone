import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie"
const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(Cookies.get("user"));
        const userId = user?.data?._id;
        if (userId) {
          const response = await axios.get(`https://electzone-server.onrender.com/api/users/userDetails/${userId}`);
          setOrders(response.data.orders || []);
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={order._id}>
              <strong>Order ID:</strong> {order.orderId} <br />
              <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()} <br />
              <strong>Products:</strong>
              <ul>
                {order.products.map((product, pIndex) => (
                  <li key={pIndex}>
                    <strong>Product Name:</strong> {product.productName} <br />
                    <strong>Quantity:</strong> {product.quantity} <br />
                    <strong>Price:</strong> ${product.price}
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default UserOrders;
