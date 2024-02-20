import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart, FaBars, FaSearch } from "react-icons/fa";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import img from "../assets/ElectZone-logos_black.png";
import "./NavigationBarStyle.css";

function NavigationBar2() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
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

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleDropdownToggle}
          className="full-screen-margin"
        >
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="mx-auto" style={{ border: "1px solid #ff9e4a" }}>
            <div className="input-group " style={{ flex: "1" }}>
              <input
                type="text"
                placeholder="Search"
                className="form-control search-input"
              />
              <Button className="search-button" style={{ backgroundColor: " #ff9e4a" }}>
                <FaSearch />
              </Button>
            </div>
          </Nav>

          <Nav className="ml-auto ">
            <Nav.Link href="/Cartpage" className="shop-cart me-3">
              <FaShoppingCart size={22} />
            </Nav.Link>
            <div ref={dropdownRef}>
              <NavDropdown
                className="shop-cart"
                title={<FaBars size={22} />}
                id="basic-nav-dropdown"
                show={showDropdown}
                align="end"
                onClick={handleDropdownToggle}
              >
                <NavDropdown.Item href="/Login">
                  Home
                </NavDropdown.Item>
                <NavDropdown.Item href="/UserProfile">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Contact us
                </NavDropdown.Item>
                <NavDropdown.Item href="/Cartpage">My Cart</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  My orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Logout</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar2;