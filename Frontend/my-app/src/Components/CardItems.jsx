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

function CardItems() {
  const { addItem } = useCart();
  const [data,setData] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:5000/api/cards')
    .then((response)=>setData(response.data))
    .catch((error)=>console.error(error))
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
                      navigate("/BuyProducts");
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
      ))
      }
    </div>
  );
}

export default CardItems;
