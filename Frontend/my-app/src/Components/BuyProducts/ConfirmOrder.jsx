import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckOut from './CheckOut';
import "../BuyProducts/CheckOutStyle.css";
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import "../BuyProducts/ConfirmOrderStyle.css";

const stripePromise = loadStripe("pk_test_51Pez84Glv44VgkWUycmbDjCxdByoFchGmuMVBNdVPIQozAh7pkufsnQSRd3VXmdZ2ScohxRPcdzPmbkHv1XuJSM900NpTxkMBw");

export default function ConfirmOrder() {
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const location = useLocation();
  const { shippingDetails = {}, items = [], product = {} } = location.state || {};
  const allItems = [
    ...items,
    ...(product && Object.keys(product).length ? [product] : [])
  ];
  
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  const cartTotal = calculateTotalPrice(allItems);
  const shippingCost = 5.00;
  const taxCost = 1.00;
  const totalCost = (cartTotal + shippingCost + taxCost).toFixed(2);
  const isCartEmpty = allItems.length === 0;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const response = await fetch("https://electzone-ecommerce.onrender.com/api/users/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: allItems,userEmail : userInfo.email }), // Ensure this data is what your backend expects
      });
      
      const session = await response.json();
      console.log("Session data:", session); // Debug log
  
      if (!session.id) {
        throw new Error("Session ID not found");
      }
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.error(result.error.message);
        alert(result.error.message); 
      } 
    } catch (error) {
      console.error("Error during payment:", error);
      alert("An error occurred during payment. Please try again."); // Show error to user
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Fragment>
      <CheckOut Shipping ConfirmOrder />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p><b>UserName:</b> {userInfo ? userInfo.name : 'N/A'}</p>
          <p><b>Address:</b> {shippingDetails.address || 'N/A'}</p>
          <p><b>City:</b> {shippingDetails.city || 'N/A'}</p>
          <p><b>Phone:</b> {shippingDetails.phoneNo || 'N/A'}</p>
          <p><b>Postal Code:</b> {shippingDetails.postalCode || 'N/A'}</p>
          <p><b>State:</b> {shippingDetails.state || 'N/A'}</p>
          <p><b>Country:</b> {shippingDetails.country || 'N/A'}</p>
          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>
          {isCartEmpty ? (
            <p>No items in cart</p>
          ) : (
            allItems.map((item, index) => (
              <div className="cart-item my-1" key={item.id || index}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.imgsrc} alt="Product" height="45" width="65" />
                  </div>
                  <div className="col-5 col-lg-6">
                    <p>{item.title}</p>
                  </div>
                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>${(parseFloat(item.price) || 0).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          <hr />
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>Subtotal: <span className="order-summary-values">${cartTotal.toFixed(2)}</span></p>
            <p>Shipping: <span className="order-summary-values">${shippingCost.toFixed(2)}</span></p>
            <p>Tax: <span className="order-summary-values">${taxCost.toFixed(2)}</span></p>
            <hr />
            <p>Total: <span className="order-summary-values">${totalCost}</span></p>
            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={handlePayment}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
