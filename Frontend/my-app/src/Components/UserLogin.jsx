import React, {useState }  from 'react'
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import{useNavigate} from "react-router-dom";
import axios from "axios";
function UserLogin  ()  {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    try {
      const result = await axios.post('http://localhost:8000/login', { email, password });
      if (result.data.message === 'exists') {
        navigate('/Login'); 
        
      } 
      else{
       setError("Invalid Email or Password");
      }
    } catch (err) {
      console.error('Error during form submission:', err);
      setError('Invalid credentials. Please try again.');
    }
  };
  return (
   <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email'
       onChange={e => setEmail(e.target.value)}
      />
      <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password'
      onChange={e => setPassword(e.target.value)}
      />
      <div className="text-danger">{error}</div>
      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>
  <MDBBtn className="mb-4 w-100" type='submit'
   onClick={handleSubmit}
  >Sign in</MDBBtn>
      <div className="text-center">
        <p>Not a member? <a href="/UserSignup">Register</a></p>
     <p>or sign up with:</p>
        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm"/>
          </MDBBtn>

        </div>
      </div>

    </MDBContainer>
  )
}

export default UserLogin;