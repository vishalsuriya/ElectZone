import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { FaSearch, FaBars } from 'react-icons/fa';
import { GrCart } from 'react-icons/gr';
import "../Components/NavigationBarStyle.css";
function NavigationBar2() {
  const [showDropdown, setShowDropdown] = useState(true);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>ElectZone</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleDropdownToggle}>
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="me-auto d-flex">
            <Form.Control type="text" placeholder="Search" className="me-2" />
            <Nav.Link>
              <FaSearch />
            </Nav.Link>
            
          </Form>
          <Nav>
            <Nav.Link>
              <GrCart />
            </Nav.Link>
            {showDropdown && (
              <NavDropdown title={<FaBars />} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar2;
