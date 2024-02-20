import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import "../Components/CarditemsStyle.css";
import img1 from "../assets/Card3 images/toogle.webp";
import img2 from "../assets/Card3 images/rocker.jpg";
import img3 from "../assets/Card3 images/push.webp";
import img4 from "../assets/Card3 images/rot.jpg";
import img5 from "../assets/Card3 images/slide.jpg";
import img6 from "../assets/Card3 images/tact.jpg";
import img7 from "../assets/Card3 images/dip.jpg";
import img8 from "../assets/Card3 images/limit.webp";
import img9 from "../assets/Card3 images/reed.webp";
import img10 from "../assets/Card3 images/prox.jpg";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import CircleData3 from "./CircleCardData3";
import NavigationBar from "../Components/NavigationBar2";
import Footer from "../Components/Footer";
function CircleCard3() {
  const { addItem } = useCart();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/cards3");
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

  const image = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
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
              <MDBCardImage src={image[index]} alt={product.title} />
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
                      style={{
                        fontSize: "0.8rem",
                        padding: "0.2rem 0.5rem",
                        backgroundColor: "#ffae5d",
                      }}
                      onClick={() => addItem(product)}
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
export default CircleCard3;
