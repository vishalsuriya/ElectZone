// NavigationBar2.js
import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import img from "../assets/ElectZone-logos_black.png";
import "./NavigationBarStyle.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/UserActions";
import SearchBar from "./Searchbar";

function NavigationBar2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logouthandler = () => {
    dispatch(logout());
    navigate("/");
  }
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
    <>
      <Navbar expand="lg" className="navbar">
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
            <Nav className="mx-auto">
              <SearchBar />
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
                  <NavDropdown.Item href="/Login">Home</NavDropdown.Item>
                  <NavDropdown.Item href="/UserProfile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/ProductPage">
                    Contact us
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/Cartpage">My Cart</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    My orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logouthandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar2;
