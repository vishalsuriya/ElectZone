import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import img from "../../assets/ElectZone-logos_black.png";
import { GrLogin } from "react-icons/gr";
import SearchBar from "../Searchbar/Searchbar";
import "./NavigationBarStyle.css";

function NavigationBar() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="navbar">
      <Container style={{ maxWidth: "100%" }}>
        <Navbar.Brand className="d-flex align-items-center justify-content-start ms-5">
          <img
            src={img}
            alt="Logo"
            className="d-inline-block align-top me-2"
            width="40"
            height="40"
          />
          <span className="brand-name">ElectZone</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <SearchBar />
          </Nav>
          <Nav className="ml-auto">
            <Button
              onClick={() => navigate("/UserLogin")}
              className="login-button"
            >
              <GrLogin className="me-1" /> Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
