import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container, Image, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import Cookies from "js-cookie";
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const userInfo = Cookies.get('user');
    if (userInfo) {
      navigate("/Login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch("https://electzone-server.onrender.com/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set('user', JSON.stringify(data));
        navigate('/Login');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="py-5">
      <Row className="align-items-center g-lg-4">
        <Col>
          <Image
            src="https://lms.go-ecommerce.my/Customizing/global/skin/mdec/images/main-keyvisualss.png"
            alt="Bootstrap Themes"
            fluid
            className="d-block mx-lg-auto"
            width={500}
            height={200}
            background="transparent"
          />
        </Col>
        <Col md={10} mx="auto" lg={5}>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={handleSubmit} className="p-4 p-md-5">
            <Form.Group controlId="formBasicEmail" className="form-floating mb-3">
              <Form.Control
                type="email"
                value={email}
                id="floatingInput"
                placeholder="name@example.com"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Label htmlFor="floatingInput">Email address</Form.Label>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="form-floating mb-3">
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  id="floatingPassword"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size="20" /> : <EyeSlash size="20" />}
                </Button>
              </InputGroup>
          
            </Form.Group>

            <Button className="w-100 btn btn-lg btn-primary" type="submit">
              Login
            </Button>

            <hr className="my-4" />
            <small className="text-body-secondary">
              New Customer? <Link to="/UserSignup">Register Here</Link>
            </small>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserLogin;
