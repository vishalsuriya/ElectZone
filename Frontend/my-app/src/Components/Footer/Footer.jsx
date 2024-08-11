import React, { useState, useRef } from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import "../Footer/FooterStyle.css";

function Footer() {
  const [buttonText, setButtonText] = useState("Subscribe");
  const emailInputRef = useRef(null);

  const handleSubscribe = () => {
    const email = emailInputRef.current.value;

    if (email) {
      setButtonText("Subscribed!");
      emailInputRef.current.value = "";
      setTimeout(() => {
        setButtonText("Subscribe");
      }, 3000); 
    } else {
      alert("Please enter an email address");
    }
  };

  return (
    <MDBFooter
      className="text-center text-lg-start text-muted footbar"
      style={{ width: "100%", backgroundColor: "#cc7121" }}
    >
      <section className="p-4 mt-5">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">
                <MDBIcon icon="gem" className="me-3" />
                ElectZone
              </h6>
              <p className="text-white">
                At ElectZone, we are dedicated to providing high-quality electronic products and exceptional customer service. Our mission is to bring you the latest in technology and innovation, ensuring you have access to the best products on the market.
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-4 text-md-start text-center">
              <h6 className="text-uppercase fw-bold mb-4 text-white">Contact</h6>
              <p className="text-white">
                <MDBIcon icon="home" className="me-3" />
                Coimbatore , Bangalore ,goa
              </p>
              <p className="text-white ">
                <MDBIcon icon="envelope" className="me-3" />
                vishalsuriya2003@gmail.com
              </p>
              <p className="text-white ">
                <MDBIcon icon="phone" className="me-3" /> +91 9344360916 , 895775894
              </p>
              <p className="text-white">
                <MDBIcon icon="print" className="me-3" /> +01 5546566666 , 765897549
              </p>
            </MDBCol>

            <MDBCol md="4" size="12" className="mb-4 text-center">
              <MDBInput
                type="text"
                id="form5Example2"
                placeholder="Email address"
                className="search-input"
                ref={emailInputRef}
              />
              <MDBBtn
                type="button"
                id="sub-btn"
                onClick={handleSubscribe}
                color="light"
                className="m-1"
              >
                {buttonText}
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <section className="text-center mb-6">
        {['facebook-f', 'twitter', 'google', 'instagram', 'linkedin-in', 'github'].map((icon, index) => (
          <MDBBtn
            key={index}
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
            aria-label={icon}
          >
            <MDBIcon fab icon={icon} />
          </MDBBtn>
        ))}
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © {new Date().getFullYear()} Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          ElectZone.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
