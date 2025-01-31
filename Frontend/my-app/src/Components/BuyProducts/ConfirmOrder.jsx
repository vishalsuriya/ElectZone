import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckOut from './CheckOut';
import "../BuyProducts/CheckOutStyle.css";
import { loadStripe } from '@stripe/stripe-js';
import "../BuyProducts/ConfirmOrderStyle.css";

const stripePromise = loadStripe("pk_test_51Pez84Glv44VgkWUycmbDjCxdByoFchGmuMVBNdVPIQozAh7pkufsnQSRd3VXmdZ2ScohxRPcdzPmbkHv1XuJSM900NpTxkMBw");

export default function ConfirmOrder() {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const { shippingDetails = {},  product = {},data=[] } = location.state || {};
  const allItems = [
    ...data,
    ...(Object.keys(product).length ? [product] : [])
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
      const response = await fetch("https://electzone-server.onrender.com/api/users/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: allItems, userEmail: user.data.email ,userName : user.data.name}),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const session = await response.json();
      if (!session.sessionId) {
        throw new Error("Session ID not found");
      }
    const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });
    if(result.error){
      console.log(result.error.message);
    }
    } catch (error) {
      alert("An error occurred during payment. Please try again.");
      console.log(error)
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
          <p><b>UserName:</b> { user.data.name || 'N/A'}</p>
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
                    <p>₹{(parseFloat(item.price) || 0).toFixed(2)}</p>
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
            <p>Subtotal: <span className="order-summary-values">₹{cartTotal.toFixed(2)}</span></p>
            <p>Shipping: <span className="order-summary-values">₹{shippingCost.toFixed(2)}</span></p>
            <p>Tax: <span className="order-summary-values">₹{taxCost.toFixed(2)}</span></p>
            <hr />
            <p>Total: <span className="order-summary-values">₹{totalCost}</span></p>
            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
