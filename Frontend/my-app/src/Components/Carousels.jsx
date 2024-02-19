import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import img1 from "../assets/Slide1.jpg";
import img2 from "../assets/Slide2.webp";
import img3 from "../assets/Slide3.jpg";

function Slide() {
  return (
    <MDBCarousel showControls style={{ height: "300px", width: "100%" }}>
      <MDBCarouselItem itemId={1}>
        <img
          src={img1}
          className="d-block w-100"
          alt="..."
          style={{ maxHeight: "300px" }}
        />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img
          src={img2}
          className="d-block w-100"
          alt="..."
          style={{ maxHeight: "300px" }}
        />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img
          src={img3}
          className="d-block w-100"
          alt="..."
          style={{ maxHeight: "300px" }}
        />
      </MDBCarouselItem>
    </MDBCarousel>
  );
}

export default Slide;