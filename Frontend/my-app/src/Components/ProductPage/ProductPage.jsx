import React, { useState, useEffect  } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const ProductPage = () => {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const [
          cardsResponse,
          circleCards1Response,
          circleCards2Response,
          circleCards3Response,
          circleCards4Response,
          circleCards5Response,
        ] = await Promise.all([
          axios.get(`http://localhost:5000/api/cards`),
          axios.get(`http://localhost:5000/api/cards/CircleCards1`),
          axios.get(`http://localhost:5000/api/cards/CircleCards2`),
          axios.get(`http://localhost:5000/api/cards/CircleCards3`),
          axios.get(`http://localhost:5000/api/cards/CircleCards4`),
          axios.get(`http://localhost:5000/api/cards/CircleCards5`),
        ]);

        // Combine the data from all responses
        const combinedData = [
          ...cardsResponse.data,
          ...circleCards1Response.data,
          ...circleCards2Response.data,
          ...circleCards3Response.data,
          ...circleCards4Response.data,
          ...circleCards5Response.data,
        ];

        setData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error details:",
          error.response ? error.response.data : error.message
        );
        // Render the error message as a string
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error loading the products: {error}</p>;
  }

  const location = useLocation();
  const { productid } = location.state || {};
  return (
    <>
    
    
       
        <MDBRow key={productid} className="spec_pro_head">
        <MDBCol sm="12">
          <MDBRow>
            <MDBCol md="6" className="img_cont">
              <img 
                src={productid.imgsrc} 
                alt="Product" 
                className="img-fluid" 
              />
              <div className="d-flex buttons mt-3">
                <MDBBtn color="primary" className="me-2">
                  <i className="fa-solid fa-cart-shopping" style={{ marginRight: '4px' }}></i> ADD TO CART
                </MDBBtn>
                <MDBBtn color="secondary">
                  <i className="fa-brands fa-buy-n-large fa-bounce" style={{ fontSize: '19px' }}></i> BUY NOW
                </MDBBtn>
              </div>
            </MDBCol>
            <MDBCol md="6" className="col_two">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle className="product_name">{productid.title}</MDBCardTitle>
                  <MDBCardText className="product_desc">
{productid.content}                  </MDBCardText>
                  <MDBCardText className="price_cont">Special Price</MDBCardText>
                  <MDBCardText className="product_cost">
                    <h3 className="d-inline-flex">
                      <i className="fa-sharp fa-solid fa-indian-rupee-sign"></i> 77000
                      <h6 className="dicount">M.R.P: {productid.price}</h6>
                      <h5 className="discount_offer">20% off</h5>
                    </h3>
                  </MDBCardText>
                  <MDBCardText className="avail_offer">Available Offers</MDBCardText>
                  <MDBCardText className="spcl_offer">
                    <i className="fa-solid fa-tag" style={{ color: 'rgb(79, 222, 96)' }}></i>
                    <span className="avail_cont" style={{ color: 'rgb(33, 33, 33)' }}>Special Offer</span>
                    <p className="avail_cont">Get extra 25% off (price inclusive of cashback/coupon).</p>
                  </MDBCardText>
                  <MDBCardText className="spcl_offer">
                    <i className="fa-solid fa-tag" style={{ color: 'rgb(79, 222, 96)' }}></i>
                    <span className="avail_cont" style={{ color: 'rgb(33, 33, 33)' }}>Special Offer</span>
                    <p className="avail_cont">Get extra 10% off (first time new user to buy).</p>
                  </MDBCardText>
                  <MDBCardText className="spcl_offer">
                    <i className="fa-solid fa-tag" style={{ color: 'rgb(79, 222, 96)' }}></i>
                    <p className="avail_cont">Buy This Product and get ₹500 Off on Next AC Purchase*.</p>
                  </MDBCardText>
                  <MDBCardText className="spcl_offer">
                    <i className="fa-solid fa-tag" style={{ color: 'rgb(79, 222, 96)' }}></i>
                    <p className="avail_cont">If you are a student get extra ₹1000 Off.</p>
                  </MDBCardText>
                  <MDBCardText className="spcl_offer">
                    <i className="fa-solid fa-tag" style={{ color: 'rgb(79, 222, 96)' }}></i>
                    <span className="avail_cont" style={{ color: 'rgb(33, 33, 33)' }}>Bank Offer</span>
                    <p className="avail_cont">5% Cashback on Flipkart Axis Bank Card.</p>
                  </MDBCardText>
                  <MDBCardText className="spcl_offer">
                    <i className="fa-solid fa-tag" style={{ color: 'rgb(79, 222, 96)' }}></i>
                    <p className="avail_cont">Buy for 100 get ₹200 off your Next Buy.</p>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      
    </>
  );
};

export default ProductPage;
