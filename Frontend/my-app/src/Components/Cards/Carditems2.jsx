import React, { useState, useEffect } from "react";
import "./CarditemsStyle.css";
import axios  from "axios";
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
