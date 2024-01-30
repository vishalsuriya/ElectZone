import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart, FaBars, FaSearch } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import '../Components/NavigationBarStyle.css';
import  img from '../Components/ElectZone-logos_black.png'

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
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ maxWidth: '95%' }}>
      <Navbar.Brand className="d-flex align-items-center">
          <img
            src={img}// Replace with the actual path to your logo image
            alt="Logo"
            className="d-inline-block align-top ml-auto me-2"
            width="35"
            height="35"
          />
          {' '}
          ElectZone
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleDropdownToggle}
          className="full-screen-margin" // Apply the custom class for full-screen margin
        >
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="mx-auto">
            <div className="d-flex align-items-center">
              <input type="text" placeholder="Search" className="me-2 form-control" />
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
            </div>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link>
              <FaShoppingCart />
            </Nav.Link>
            <div  ref={dropdownRef}>
              <NavDropdown
                title={<FaBars  />}
                id="basic-nav-dropdown"
                show={showDropdown}
                align="end"
                onClick={handleDropdownToggle}
              >
                <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Logout</NavDropdown.Item>
              </NavDropdown>
            </div>
          

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar2;