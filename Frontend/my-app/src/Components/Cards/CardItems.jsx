import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
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
  const { addItem } = useCart();
  const [data, setData] = useState([]);
  const [addedItem, setAddedItem] = useState(null); // State for confirmation message
  const [loginPrompt, setLoginPrompt] = useState(false); // State for login prompt

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cards")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  function handleClick(product) {
    navigate("/ProductPage", { state: { product: product } });
  }

  const handleAddItem = (e, product) => {
    e.stopPropagation();
    if (!localStorage.getItem("userInfo")) {
      setLoginPrompt(true);
      setTimeout(() => {
        navigate("/UserLogin");
      }, 2000); // Redirect after 2 seconds
    } else {
      addItem(product);
      setAddedItem(product);
      setTimeout(() => setAddedItem(null), 3000); // Hide confirmation message after 3 seconds
    }
  };

  return (
    <div className="product-cards-container">
      {data.map((product, index) => (
        <MDBRipple
          key={index}
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
          onClick={() => handleClick(product)} // Ensure product page navigation is handled
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
                    onClick={(e) => handleAddItem(e, product)} // Pass event to prevent propagation
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
          You need to be logged in to add items to the cart. Redirecting to login page...
        </div>
      )}
    </div>
  );
}

export default CardItems;
