import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import "../Cards/CircleCardStyle.css";
import NavigationBar from "../NavigationBar2";
import Footer from "../Footer";
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
function CircleCard2() {
  const navigate = useNavigate();

  const { addItem } = useCart();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/cards/CircleCards2"
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
    navigate("/ProductPage", { state: { productid: product } });
  }
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
              style={{ width: "300px" }}
              className="card-container"
              onClick={() => handleClick(product)}
            >
              <MDBCardImage src={product.imgsrc} alt={product.title} />
              <MDBCardBody>
                <MDBCardTitle>{product.title}</MDBCardTitle>
                <MDBCardText>{product.content}</MDBCardText>
                <div className="product-details">
                  <span className="price">₹{product.price}</span>
                  <div className="button-container">
                    <MDBBtn
                      className="btn-buy-now me-4"
                      style={{
                        fontSize: "0.8rem",
                        padding: "0.5rem 1.0rem",
                        backgroundColor: "transparent",
                        color: "black",
                      }}
                      onClick={() => {
                        navigate("/BuyProducts");
                      }}
                    >
                      Buy Now
                    </MDBBtn>

                    <MDBBtn
                      onClick={() => addItem(product)}
                      style={{
                        fontSize: "0.8rem",
                        padding: "0.5rem 1.0rem",
                        backgroundColor: "transparent",
                      }}
                    >
                      <a href="#">
                        <i class="fa fa-shopping-cart"></i>
                      </a>
                    </MDBBtn>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBRipple>
        ))}
      </div>
      <Footer />
    </div>
  );
}
export default CircleCard2;
