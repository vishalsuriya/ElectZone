import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

function UserSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ElectZone");
      data.append("cloud_name", "dy6n0qbpd");
      fetch("https://api.cloudinary.com/v1_1/dy6n0qbpd/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmpassword) {
      setMessage("Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
      return;
    }
    if (!validatePassword(password)) {
      setMessage(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://electzone-server.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, pic }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create account");
      }
      localStorage.setItem('user', JSON.stringify(data))
      navigate("/Login");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="align-items-center g-lg-4">
        <Col>
          <Image
            src="https://lms.go-ecommerce.my/Customizing/global/skin/mdec/images/main-keyvisualss.png"
            alt="Signup Visual"
            fluid
            className="d-block mx-lg-auto"
            width={500}
            height={200}
          />
        </Col>
        <Col md={12} lg={6} className="d-flex justify-content-center">
          <div className="signup-container p-4 p-md-5 ">
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={handleSubmit} className="w-100">
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter name"
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  autoComplete="off"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmpassword}
                  autoComplete="off"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
              <hr className="my-4" />
              <large className="text-body-secondary">
                Have an Account? <Link to="/UserLogin">Login</Link>
              </large>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserSignup;
