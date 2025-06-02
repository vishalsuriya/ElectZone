import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap';
import Loading from '../Loading';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('https://electzone-server.onrender.com/api/users/forgetpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email : email
        }),
      });
      const data = await response.json();
      console.log(data)
      alert("Check your email to reset password");
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Form className="p-4 shadow-sm rounded" onSubmit={handleSubmit}>
            <h3 className="mb-4 text-center">Reset Password</h3>
            <Form.Group controlId="formBasicPassword" className="form-floating mb-3">
              <InputGroup>
                <Form.Control
                  type='email'
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
               
              </InputGroup>
            </Form.Group>
            <Button className="w-100 btn btn-lg btn-primary" type="submit"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPassword;
