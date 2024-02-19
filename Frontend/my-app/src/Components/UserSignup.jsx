import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
  }
  from 'mdb-react-ui-kit';

function UserSignup  () {
  const navigate = useNavigate;
  const [name, setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:8000/UserSignup', {
        name,
        email,
        password,
      });

      if (res.data === "exists") {
        alert("User already exists");
      } else if (res.data === "notexists") {
        navigate("/UserLogin");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  }
  return (
    <div>
  <MDBContainer fluid>
<MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
  <MDBCardBody>
    <MDBRow>
      <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

        <div className="d-flex flex-row align-items-center mb-4 ">
          <MDBIcon fas icon="user me-3" size='lg'/>
          <MDBInput label='Your Name' id='form1' type='text' className='w-100'
           value={name} onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="envelope me-3" size='lg'/>
          <MDBInput label='Your Email' id='form2' type='email'
          value={email} onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="lock me-3" size='lg'/>
          <MDBInput label='Password' id='form3' type='password'
           value={password} onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="key me-3" size='lg'/>
          <MDBInput label='Repeat your password' id='form4' type='password'/>
        </div>
      <Link to={"/UserLogin"}>  <MDBBtn className='mb-4' size='lg' onClick={submit}>Register</MDBBtn></Link>

      </MDBCol>

      <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
      </MDBCol>

    </MDBRow>
  </MDBCardBody>
</MDBCard>

</MDBContainer>
    </div>
  )
}

export default UserSignup;