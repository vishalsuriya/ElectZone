import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"
import "../Cards/CircleCardStyle.css";
import { useNavigate } from "react-router-dom";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import Footer from "../Footer/Footer";
import NavigationBar2 from "../Header/NavigationBar2";

function CircleCard3() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [addedItem, setAddedItem] = useState(null);
  const [loginPrompt, setLoginPrompt] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://electzone-server.onrender.com/api/cards/CircleCards3"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (addedItem) {
      const timer = setTimeout(() => setAddedItem(null), 3000); 
      return () => clearTimeout(timer);
    }
  }, [addedItem]);
  
  function handleClick(product) {
    navigate("/ProductPage", { state: { product: product } });
  }

  const handleAddItem = async(e, product) => {
    e.stopPropagation();
    if (!Cookies.get("user")) {
      setLoginPrompt(true);
      setTimeout(() => {
        navigate("/UserLogin");
      }, 2000); 
    }
    setAddedItem(product);
    try {
      const user = JSON.parse(Cookies.get("user"));
      const email = user.data.email;
      const response = await fetch("https://electzone-server.onrender.com/api/cards/userCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product ,email}),
      });
      await response.json();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoginPrompt(false);
    }
  };
  return (
    <div>
      <NavigationBar2 />

      <div className="product-cards-container">
        {data.map((product, index) => (
          <MDBRipple
            key={index}
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCard
              style={{ width: "275px" }}
              className="card-container"
              onClick={() => handleClick(product)}
            >
              <MDBCardImage src={product.imgsrc} alt={product.title} />
              <MDBCardBody>
                <MDBCardText>{product.title}</MDBCardText>
                <div className="product-details">
                  <span className="price">
                    <MDBCardTitle>₹{product.price}</MDBCardTitle>
                  </span>
                  <div className="button-container">
                    <MDBBtn
                      onClick={(e) => handleAddItem(e, product)}
                      style={{
                        fontSize: "0.8rem",
                        padding: "0.5rem 1.0rem",
                        backgroundColor: "black",
                      }}
                      aria-label={`Add ${product.title} to cart`}
                    >
                      ADD TO Cart
                    </MDBBtn>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBRipple>
        ))}
        {addedItem && (
          <div className="confirmation-message">
            {addedItem.title} has been added to the cart!
          </div>
        )}
         {loginPrompt && (
        <div className="login-prompt">
          Please log in to add items to the cart.
        </div>
         )}
      </div>

      <Footer />
    </div>
  );
}

export default CircleCard3;
