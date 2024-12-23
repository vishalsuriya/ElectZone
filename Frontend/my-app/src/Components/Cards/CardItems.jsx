import React, { useState, useEffect } from "react";
import "./CarditemsStyle.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CardItems() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [addedItem, setAddedItem] = useState(null); 
  const [loginPrompt, setLoginPrompt] = useState(false);

  useEffect(() => {
    axios
      .get("https://electzone-server.onrender.com/api/cards")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (addedItem) {
      const timer = setTimeout(() => setAddedItem(null), 3000); 
      return () => clearTimeout(timer);
    }
  }, [addedItem]);

  const handleAddItem = async(e, product) => {
    e.stopPropagation();
    if (!localStorage.getItem("user")) {
      setLoginPrompt(true);
      setTimeout(() => {
        navigate("/UserLogin");
      }, 2000); 
    }
    setAddedItem(product);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
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

  function handleClick(product) {
    navigate("/ProductPage", { state: { product: product } });
  }
  return (
    <div className="product-cards-container">
      {data.map((product, index) => (
        <MDBRipple
          key={index}
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
          onClick={() => handleClick(product)}
        >
          <MDBCard
            style={{ width: "275px" }}
            className="card-container"
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
                    onClick={(e)=>handleAddItem(e,product)}
                    style={{
                      fontSize: "0.8rem",
                      padding: "0.5rem 1.0rem",
                      backgroundColor: "black",
                      color: "white",
                    }}
                    aria-label={`Add ${product.title} to cart`}
                  >
                    Add to Cart
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
          You need to be login to add items to the cart. Redirecting to login page...
        </div>
      )}
    </div>
  );
}

export default CardItems;
