import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import "../ProductPage/ProductPage.css";
const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useCart();
  const { product } = location.state || {};
  const [addedItem, setAddedItem] = useState(null);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of product data
    setLoading(false);
  }, []);

  const handleAddToCart = (product) => {
    if (!localStorage.getItem("userInfo")) {
      setLoginPrompt(true);
      setTimeout(() => {
        navigate("/UserLogin");
      }, 2000); // Redirect after 2 seconds
    } else {
      addItem(product);
      setAddedItem(product);
    }
  };

  const handleBuyNow = (product) => {
    if (!localStorage.getItem("userInfo")) {
      setLoginPrompt(true);
      setTimeout(() => {
        navigate("/UserLogin");
      }, 2000); // Redirect after 2 seconds
    } else {
      navigate("/Shipping", { state: { product: product } });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const discount = 5;
  const offerPrice = product.price - discount;
  const offer = Math.floor((100 - (offerPrice / product.price) * 100));

  const offers = product.offers || [];

  return (
    <>
      <MDBRow className="spec_pro_head">
        <MDBCol sm="12">
          <MDBRow>
            <MDBCol md="6" className="img_cont">
              <img 
                src={product.imgsrc} 
                alt={product.title} 
                className="img-fluid" 
              />
              <div className="buttons">
                <MDBBtn 
                  color="primary" 
                  className="me-2"
                  onClick={() => handleAddToCart(product)}
                  aria-label={`Add ${product.title} to cart`}
                >
                  <i className="fa-solid fa-cart-shopping" style={{ marginRight: '4px' }}></i> ADD TO CART
                </MDBBtn>
                <MDBBtn 
                  color="secondary"
                  onClick={() => handleBuyNow(product)}
                  aria-label={`Buy ${product.title}`}
                >
                  <i className="fa-brands fa-buy-n-large fa-bounce" style={{ fontSize: '19px' }}></i> BUY NOW
                </MDBBtn>
              </div>
            </MDBCol>
            <MDBCol md="6" className="col_two">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle className="product_name">{product.title}</MDBCardTitle>
                  <MDBCardText className="product_desc">{product.content}</MDBCardText>
                  <MDBCardText className="price_cont">Special Price</MDBCardText>
                  <MDBCardText className="product_cost">
                    <h3 className="d-inline-flex">
                      <i className="fa-sharp fa-solid fa-indian-rupee-sign"></i> {offerPrice} 
                      <h6 className="dicount">M.R.P: {product.price}</h6>
                      <h5 className="discount_offer">{offer}% OFF</h5>
                    </h3>
                  </MDBCardText>
                  <MDBCardText className="avail_offer">Available Offers</MDBCardText>
                  {[
                    "Get extra 25% off (price inclusive of cashback/coupon).",
                    "Get extra 10% off (first time new user to buy).",
                    "Buy This Product and get ₹500 Off on Next AC Purchase*.",
                    "If you are a student get extra ₹1000 Off.",
                    "5% Cashback on Flipkart Axis Bank Card.",
                    "Buy for 100 get ₹200 off your Next Buy.",
                  ].map((offer, index) => (
                    <MDBCardText className="spcl_offer" key={index}>
                      <i className="fa-solid fa-tag" style={{ color: 'rgb(79, 222, 96)' }}></i>
                      <span className="avail_cont" style={{ color: 'rgb(33, 33, 33)' }}>Special Offer</span>
                      <p className="avail_cont">{offer}</p>
                    </MDBCardText>
                  ))}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      {addedItem && (
        <div className="confirmation-message">
          {addedItem.title} has been added to the cart!
        </div>
      )}
      {loginPrompt && (
        <div className="login-prompt">
          Please log in to add items to the cart or make a purchase. Redirecting to login page...
        </div>
      )}
    </>
  );
};

export default ProductPage;
