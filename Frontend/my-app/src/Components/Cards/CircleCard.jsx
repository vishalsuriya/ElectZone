import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./CircleCardStyle.css";

function CircleCard() {
  return (
    <MDBRow className="custom-center-class" style={{ width: "100%" }}>
      <MDBCol lg="2" md="4" className="mb-4">
        <div className="circular-image-container">
          <a href="CircleCard1">
            {" "}
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51HA3ji2bnJOH9AJ_YcL7NUVSu0mc0wEpug&usqp=CAU"
              }
              className="img-fluid"
              alt=""
            />
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
            <img
              src={"https://adiy.in/wp-content/uploads/2022/09/ntc-1.jpg"}
              className="img-fluid"
              alt=""
            />
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
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVblOTuyz5EX-W7BU3bujayXYbdu7P7EUechqAIXYe00SGbY-kFPgrJ7g16W01e_IwlfE&usqp=CAU"
              }
              className="img-fluid"
              alt=""
            />
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
            <img
              src={
                "https://probots.co.in/pub/media/catalog/product/cache/d8ddd0f9b0cd008b57085cd218b48832/r/e/regulator-ic-7824-fet-transistor-sdl958138588-1-50b5d.jpg"
              }
              className="img-fluid"
              alt=""
            />
          </a>
          <a className="text-center" href="/CircleCard4">
            Voltage Regulators
          </a>
        </div>
      </MDBCol>
      <MDBCol lg="2" md="4" className="mb-4">
        <div className="circular-image-container">
          <a href="/CircleCard5">
            {" "}
            <img
              src={
                "https://tiimg.tistatic.com/fp/1/007/613/8-watt-long-life-energy-efficient-light-weight-round-white-led-bulb-866.jpg"
              }
              className="img-fluid"
              alt=""
            />
          </a>
          <a className="text-center" href="/CircleCard5">
            LEDS
          </a>
        </div>
      </MDBCol>
    </MDBRow>
  );
}

export default CircleCard;
