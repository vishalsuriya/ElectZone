import React, { useState,useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import "../Components/UserProfile.css";
import axios from "axios";
import img from "../assets/Userimage.png";
import bcrypt from 'bcryptjs';  
function UserProfile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  
  const handleSubmit = async (event) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    event.preventDefault();
  
    try {
      // Check if the email exists in the backend
      const emailExistsResponse = await axios.get(`http://localhost:8000/data?email=${email}`);
      const emailExists = emailExistsResponse.data;
  
      if (emailExists) {
        // If the email exists, update the user profile
        const response = await axios.post('http://localhost:8000/profile', {
          email,
          phoneNumber,
          address,
          image,
        });
        console.log('Response:', response);
      } else {
        console.error('Email does not exist in the backend');
        // Handle the case when the email doesn't exist (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <h1 className='heading'>EDIT PROFILE</h1>
      <Row className="profileContainer">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group >
              <Form.Label>Name</Form.Label>
              <Form.Control
               id = "name"
                type="text"
                value={name}
                aria-label="Name"
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group >
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                id='email'
                type="email"
                placeholder="Enter Email"
                aria-label="Email Address"
                onChange={e => setEmail(e.target.value)}
              />
            <Form.Group >
              <Form.Label>Password</Form.Label>
              <Form.Control
               id='password'
                type="password"
                placeholder="Enter Password"
                aria-label="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
             <Form.Group >
          <Form.Label>Phone number</Form.Label>
            <Form.Control
            id='Phone number'
           type="tel"
           placeholder="91+ Enter Phone Number"
           aria-label="Phone number"
           onChange={e => setPhoneNumber(e.target.value)}
          />
         </Form.Group>
            <Form.Group >
              <Form.Label> Address</Form.Label>
              <Form.Control
              id='address'
                type="address"
                placeholder="Enter Address"
                aria-label=" Address"
                onChange={e => setAddress(e.target.value)}
              />
            </Form.Group>
            </Form.Group>
            <Form.Group >
     <Form.Label>Change Profile Picture</Form.Label>
     <Form.Control 
     name = "myfile"
     type="file" 
     id="file-upload" 
     label="Upload Profile Picture"
     accept='.jpeg,.png , .jpg'
     onChange={(e)=> handleFileUpload(e)}
     />
          </Form.Group>

         <button className='update' type='submit'>
          Update
         </button>
          </Form>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          
        >
         <img src={image || img} alt="Profile" className="profilePic" />
        </Col>
      </Row>
    </div>
  );
}
export default UserProfile;
