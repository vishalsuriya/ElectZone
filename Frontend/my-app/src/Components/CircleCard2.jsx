import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import "../Components/CarditemsStyle.css";
import NavigationBar from "../Components/NavigationBar2";
import Footer from "../Components/Footer";

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
  const { addItem } = useCart();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cards/CircleCards2");
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
            <MDBCard style={{ width: "300px" }} className="card-container">
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
                        padding: "0.2rem 0.5rem",
                        backgroundColor: "#ffae5d",
                      }}
                    >
                      BuyNow
                    </MDBBtn>
                    <MDBBtn
                      onClick={() => addItem(product)}
                      style={{
                        fontSize: "0.8rem",
                        padding: "0.2rem 0.5rem",
                        backgroundColor: "#ffae5d",
                      }}
                    >
                      Addtocart
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
