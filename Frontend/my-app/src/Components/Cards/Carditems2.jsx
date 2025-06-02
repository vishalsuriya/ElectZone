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

function CardItems2() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loginPrompt, setLoginPrompt] = useState(false);

  useEffect(() => {
    axios
      .get("https://electzone-server.onrender.com/api/cards")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);
  function handleClick(product) {
    navigate("/ProductPage", { state: { product: product } });
  }
  const handleAddItem = async(e) => {
    e.stopPropagation();
    if (!Cookies.get("user")) {
      setLoginPrompt(true);
      setTimeout(() => {
        navigate("/UserLogin");
      }, 2000); 
    }
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
                onClick={(e)=>handleAddItem(e)}
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
      {loginPrompt && (
        <div className="login-prompt">
          Please log in to add items to the cart.
        </div>
      )}
    </div>
  );
}

export default CardItems2;
