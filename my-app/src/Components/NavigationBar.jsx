import React from "react";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import  img from '../assets/ElectZone-logos_black.png'
import { FaSearch } from "react-icons/fa";
import { GrLogin } from "react-icons/gr";

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ maxWidth: '95%' }}>
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src={img}
            alt="Logo"
            className="d-inline-block align-top ml-auto me-2"
            width="35"
            height="35"
          />
          {' '}
          ElectZone
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <div className="d-flex align-items-center">
              <input type="text" placeholder="Search" className="me-2 form-control" />
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
            </div>
          </Nav>

          <Nav>
          <Link to= "/UserLogin">
              <Button variant="primary" style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem' }}>
                <GrLogin /> Login
              </Button>
              </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;