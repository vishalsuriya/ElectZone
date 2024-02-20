import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import "../Components/UserProfile.css";
import pic from "../assets/Userimage.png";
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Row className="profileContainer">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                aria-label="Name"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                aria-label="Email Address"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                aria-label="Password"
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
              />
            </Form.Group>{" "}
            <Form.Group controlId="pic">
         <Form.Label>Change Profile Picture</Form.Label>
         <Form.Control
            type="file"
             id="custom-file"
              label="Upload Profile Picture"
            custom
              />
             </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          
        >
          <img src={pic}  className="profilePic" />
          {/* Add content for the second column if needed */}
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
