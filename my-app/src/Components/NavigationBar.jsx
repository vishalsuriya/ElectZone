import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaSearch } from "react-icons/fa";
import "../Components/NavigationBarStyle.css";
function NavigationBar() {
  return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>ElectZone</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           <input type="text" placeholder="search"></input>
            <Nav.Link ><FaSearch /></Nav.Link>
          </Nav>
         <a href="/Login"><button type="sumbit">Login</button></a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
