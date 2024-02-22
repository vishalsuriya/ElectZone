import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import "../Components/CarditemsStyle.css";

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
function Carditems2() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/");
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
                <span className="price">${product.price}</span>
                <div className="button-container">
                  <MDBBtn
                    className="btn-buy-now me-4"
                    style={{
                      fontSize: "0.8rem",
                      padding: "0.2rem 0.5rem",
                      backgroundColor: "#ffae5d",
                    }}
                    onClick={() => {
                      navigate("/UserLogin");
                    }}
                  >
                    BuyNow
                  </MDBBtn>
                  <MDBBtn
                    onClick={() => {
                      navigate("/UserLogin");
                    }}
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
  );
}
export default Carditems2;
