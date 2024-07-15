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
import Shipping from "../Shipping";

function CardItems() {
  const navigate = useNavigate();
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
          className=""
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
        padding: "0.5rem 1.0rem",
        backgroundColor: "transparent",
        color:"black"
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
                          <a href="#"><i class="fa fa-shopping-cart"></i></a>

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
