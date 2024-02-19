import React, { useState }  from 'react'
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import{Link, useNavigate} from "react-router-dom";
import axios from "axios";
function UserLogin  ()  {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/UserLogin', {
        email,
        password,
      });

      if (res.data.status === 'success') {
        if (res.data.message === 'exists') {
          navigate('/Login');
        } 
      }
        else if(res.data.status === 'failure'){
         if (res.data.message === 'notexists') {
          alert('You have not signed up');
        }
      }
       else {
        alert('Invalid email Or password');
      }
    } catch (error) {
      console.error('Error:', error.message);

      alert('Wrong details');
    }
  }
  return (
   <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <form >
      <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email'
      value={email} onChange={event => setEmail(event.target.value)}
      />
      <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password'
      value={password} onChange={event => setPassword(event.target.value)}
      />
</form>
      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

  <Link to={"/Login"}> <MDBBtn className="mb-4 w-100" type='submit' 
  onClick={submit}
  >Sign in</MDBBtn></Link>   

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