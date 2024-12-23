import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setPicMessage("");
    if (pics && (pics.type === "image/jpeg" || pics.type === "image/png")) {
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
        .catch(() => {
          setPicMessage("Failed to upload image. Please try again.");
        });
    } else {
      setPicMessage("Please select a valid image (JPEG or PNG).");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.data.name || "");
      setEmail(user.data.email || "");
      setPic(user.data.pic || "");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!name || !email ) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.data?._id;
      const response = await fetch(`https://electzone-1.onrender.com/api/users/profile/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
        "Authorization": `Bearer ${user?.data?.token}`
        },
        body: JSON.stringify({ name, email, password, pic }),
      });

      const data = await response.json();
      if (response.ok) {
        setName(data.name)
        setEmail(data.email)
        setPic(data.pic)
        setPassword("")
        setConfirmPassword("")
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, data: { ...user.data, ...data } })
        );
        
        setSuccess("Profile updated successfully!");
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
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
        <Col md={12} lg={6} className="d-flex justify-content-center">
          <Image
            src={
              pic ||
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            }
            alt={name || "Profile Picture"}
            className="profilePic"
            fluid
            width={300}
            height={300}
          />
        </Col>
        <Col md={12} lg={6} className="d-flex justify-content-center">
          <div className="profile-container p-4 p-md-5">
            {loading && <Loading />}
            {success && <ErrorMessage variant="success">{success}</ErrorMessage>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
            <Form onSubmit={handleSubmit} className="w-100">
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="pic" className="mb-3">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Update
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
