import React, {useEffect, useState }  from 'react' 
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/ErrorMessage";
import Loading from "../Components/Loading";
import {useDispatch, useSelector} from "react-redux";
import { login } from '../actions/UserActions';
function UserLogin  ()  {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector((state)=>state.userLogin);
  const {loading,error,userInfo} = userLogin;
  useEffect(()=>{
  if(userInfo){
    navigate("/Login")
  }
  },[navigate,userInfo])
  const handleSubmit = async (e) => {
    e.preventDefault();
   dispatch(login(email,password))
  };
  return (
   <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={handleSubmit} >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/UserSignup">Register Here</Link>
          </Col>
        </Row>
      </div>
  );
}

export default UserLogin;