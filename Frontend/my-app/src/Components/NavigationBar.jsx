import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import img from "../assets/ElectZone-logos_black.png";
import { FaSearch } from "react-icons/fa";
import { GrLogin } from "react-icons/gr";

function NavigationBar() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ maxWidth: "100%" }}>
        <Navbar.Brand className="d-flex align-items-center justify-content-start ms-5">
          <img
            src={img}
            alt="Logo"
            className="d-inline-block align-top me-1"
            width="40"
            height="40"
          />{" "}
          ElectZone
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto" style={{ border: "1px solid blue" }}>
            <div
              className="input-group  border-end-0"
              style={{ flex: "1", borderRadius: "4px 0 0 4px" }}
            >
              <input
                type="text"
                placeholder="Search"
                className="form-control"
              />
              <Button>
                <FaSearch />
              </Button>
            </div>
          </Nav>

          <Nav className="ml-auto">
            <Button
              onClick={() => {
                navigate("/UserLogin");
              }}
              variant="primary"
              style={{ padding: "0.3rem 0.5rem", fontSize: "0.8rem" }}
            >
              <GrLogin /> Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
