import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./CircleCardStyle.css";
import img1 from "../assets/Resistor.jpg";
import img2 from "../assets/Inductor.jpg";
import img3 from "../assets/LED.jpg";
import img4 from "../assets/Capacitor.jpg";
import img5 from "../assets/Battery.webp";
function CircleCard() {
  return (
    <MDBRow className="custom-center-class" style={{ width: "100%" }}>
      <MDBCol lg="2" md="4" className="mb-4">
        <div className="circular-image-container">
          <a href="CircleCard1">
            {" "}
            <img src={img1} className="img-fluid" alt="" />
          </a>
          <a className="text-center" href="/CircleCard1">
            IC
          </a>
        </div>
      </MDBCol>
      <MDBCol lg="2" md="4" className="mb-4">
        <div className="circular-image-container">
          <a href="/CircleCard2">
            {" "}
            <img src={img2} className="img-fluid" alt="" />
          </a>
          <a className="text-center" href="/CircleCard2">
            Sensors
          </a>
        </div>
      </MDBCol>
      <MDBCol lg="2" md="4" className="mb-4">
        <div className="circular-image-container">
          <a href="/CircleCard3">
            {" "}
            <img src={img3} className="img-fluid" alt="" />
          </a>
          <a className="text-center" href="/CircleCard3">
            Switches
          </a>
        </div>
      </MDBCol>
      <MDBCol lg="2" md="4" className="mb-4">
        <div className="circular-image-container">
          <a href="/CircleCard4">
            {" "}
            <img src={img4} className="img-fluid" alt="" />
          </a>
          <a className="text-center" href="/CircleCard4">
            Capcitor
          </a>
        </div>
      </MDBCol>
      <MDBCol lg="2" md="4" className="mb-4">
        <div className="circular-image-container">
          <a href="/CircleCard5">
            {" "}
            <img src={img5} className="img-fluid" alt="" />
          </a>
          <a className="text-center" href="/CircleCard5">
            Battery
          </a>
        </div>
      </MDBCol>
    </MDBRow>
  );
}

export default CircleCard;
