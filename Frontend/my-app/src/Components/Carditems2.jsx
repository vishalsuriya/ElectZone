import React from "react";
import "../Components/CarditemsStyle.css";
import CardData from "./CardData";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

function Carditems2() {
  const navigate = useNavigate();

  return (
    <MDBContainer>
      <MDBRow className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {CardData.map((product, index) => (
          <MDBCol key={index}>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image hover-overlay"
            >
              <MDBCard className="card-container">
                <MDBCardImage src={product.imgsrc} alt={product.title} />
                <MDBCardBody>
                  <MDBCardTitle>{product.title}</MDBCardTitle>
                  <MDBCardText>{product.content}</MDBCardText>
                  <div className="product-details">
                    <span className="price">${product.price}</span>
                    <div className="button-container">
                      <MDBBtn
                        className="btn-buy-now me-4"
                        onClick={() => {
                          navigate("/UserLogin");
                        }}
                      >
                        Buy Now
                      </MDBBtn>
                      <button
                        onClick={() => {
                          navigate("/UserLogin");
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBRipple>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default Carditems2;
