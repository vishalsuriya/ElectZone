import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { register } from "../../actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/Login");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Password does not match");
    } else {
      dispatch(register(name, email, password, pic));
    }
  };

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="align-items-center g-lg-4">
        <Col >
          <Image
            src='https://lms.go-ecommerce.my/Customizing/global/skin/mdec/images/main-keyvisualss.png'
            alt="Signup Visual"
            fluid
            className="d-block mx-lg-auto"
            width={500}
            height={200}
          />
        </Col>
        <Col md={12} lg={6} className="d-flex justify-content-center">
          <div className="signup-container p-4 p-md-5 ">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
                <Form.Control type="file" onChange={(e) => postDetails(e.target.files[0])} />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
              <hr className="my-4" />
              <large className="text-body-secondary">Have an Account? <Link to="/UserLogin">Login</Link></large>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserSignup;
