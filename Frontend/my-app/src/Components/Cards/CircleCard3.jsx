import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
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
import NavigationBar from "../NavigationBar2";
import Footer from "../Footer";

function CircleCard3() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [data, setData] = useState([]);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/cards/CircleCards3"
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

  function handleClick(product) {
    navigate("/ProductPage", { state: { product: product } });
  }

  const handleAddItem = (e, product) => {
    e.stopPropagation();
    addItem(product);
    setAddedItem(product);
    setTimeout(() => setAddedItem(null), 2000); // Hide message after 2 seconds
  };

  return (
    <div>
      <NavigationBar />

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
                      Cart
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
      </div>

      <Footer />
    </div>
  );
}

export default CircleCard3;
