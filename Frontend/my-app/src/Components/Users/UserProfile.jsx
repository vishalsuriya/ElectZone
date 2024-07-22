import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/UserActions";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");
  const [formError, setFormError] = useState(""); // Added state for form errors

  const dispatch = useDispatch();
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [userInfo]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics && (pics.type === "image/jpeg" || pics.type === "image/png")) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ElectZone");
      data.append("cloud_name", "dy6n0qbpd");

      console.log("Uploading file:", pics); // Debugging line

      fetch("https://api.cloudinary.com/v1_1/dy6n0qbpd/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => {
          console.log("Response:", res); // Debugging line
          return res.json();
        })
        .then((data) => {
          console.log("Data:", data); // Debugging line
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.error("Upload failed:", err); // Debugging line
          setPicMessage("Failed to upload image. Please try again.");
        });
    } else {
      setPicMessage("Please select an image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    const userData = {
      name,
      email,
      pic,
      password,
    };
    dispatch(updateProfile(userData));
  };

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="align-items-center g-lg-4">
      <Col md={12} lg={6} className="d-flex justify-content-center">
          <Image
            src={pic || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'}
            alt={name || 'Profile Picture'}
            className="profilePic"
            fluid
            width={300}
            height={300}
          />
        </Col>
        <Col md={12} lg={6} className="d-flex justify-content-center">
          <div className="profile-container p-4 p-md-5">
            {loading && <Loading />}
            {success && (
              <ErrorMessage variant="success">Updated Successfully</ErrorMessage>
            )}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {formError && <ErrorMessage variant="danger">{formError}</ErrorMessage>} {/* Display form errors */}
            {picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>} {/* Display pic upload errors */}
            <Form onSubmit={submitHandler} className="w-100">
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
