import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter
      className="text-center text-lg-start text-muted footbar"
      style={{ width: "100%", backgroundColor: "#cc7121" }}
    >
      <section className="p-4 mt-5">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
            <MDBCol
              md="4"
              size="12"
              className="mb-4 text-center"
              style={{ border: "#000000" }}
            >
              <MDBInput
                type="text"
                id="form5Example2"
                placeholder="Email address"
                className="search-input"
              />
              <MDBBtn
                size="auto"
                className="mt-3"
                style={{ backgroundColor: "#ff9e4a" }}
              >
                Subscribe
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <section className="text-center mb-6">
        <MDBBtn
          outline
          color="dark"
          floating
          className="m-1"
          href="#!"
          role="button"
        >
          <MDBIcon fab icon="facebook-f" />
        </MDBBtn>

        <MDBBtn
          outline
          color="dark"
          floating
          className="m-1"
          href="#!"
          role="button"
        >
          <MDBIcon fab icon="twitter" />
        </MDBBtn>

        <MDBBtn
          outline
          color="dark"
          floating
          className="m-1"
          href="#!"
          role="button"
        >
          <MDBIcon fab icon="google" />
        </MDBBtn>

        <MDBBtn
          outline
          color="dark"
          floating
          className="m-1"
          href="#!"
          role="button"
        >
          <MDBIcon fab icon="instagram" />
        </MDBBtn>

        <MDBBtn
          outline
          color="dark"
          floating
          className="m-1 "
          href="#!"
          role="button"
        >
          <MDBIcon fab icon="linkedin-in" />
        </MDBBtn>

        <MDBBtn
          outline
          color="dark"
          floating
          className="m-1"
          href="#!"
          role="button"
        >
          <MDBIcon fab icon="github" />
        </MDBBtn>
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
