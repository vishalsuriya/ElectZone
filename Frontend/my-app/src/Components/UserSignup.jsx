import React,{useState} from 'react'
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
import { useNavigate } from 'react-router-dom';
function UserSignup  () {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const handleSubmit = async(e)=>{
    e.preventDefault();

      await  axios.post('http://localhost:8000/register',{
        name , email ,password
      })
      .then(result =>console.log(result))
      navigate("/UserLogin");
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
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="envelope me-3" size='lg'/>
          <MDBInput label='Your Email' id='form2' type='email'
         onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="lock me-3" size='lg'/>
          <MDBInput label='Password' id='form3' type='password'
           onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>
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