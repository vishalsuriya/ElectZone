import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import "../Components/CarditemsStyle.css";
import NavigationBar from "../Components/NavigationBar2";
import Footer from "../Components/Footer";
import img1 from "../assets/Card2 images/temp.webp";
import img2 from "../assets/Card2 images/pressure.jpg";
import img3 from "../assets/servo.webp";
import img4 from "../assets/Inductor.jpg";
import img5 from "../assets/ethernet.webp";
import img6 from "../assets/trans.webp";
import img7 from "../assets/lcd.webp";
import img8 from "../assets/light.jpg";
import img9 from "../assets/push.jpg";
import img10 from "../assets/tweeter.jpg";
import img11 from "../assets/terminal.jpg";
import img12 from "../assets/zener.jpg";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import CircleData5 from "./CircleCardData5";

export default function CircleCard5() {
  const { addItem } = useCart();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/cards5");
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

  const image = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];
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
