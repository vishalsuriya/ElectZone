import React from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import "../Components/CircleCardStyle.css";
function CircleCard() {
  return (
    <MDBRow className='custom-center-class'>
      <MDBCol lg='2' md='6' className='mb-4'>
        <img
          src='https://mdbootstrap.com/img/new/standard/city/047.webp'
          className='img-fluid rounded-circle'
          alt=''
        />
      </MDBCol>
      <MDBCol lg='2' md='6' className='mb-4'>
        <img 
          src='https://mdbootstrap.com/img/new/standard/city/047.webp'
          className='img-fluid rounded-circle'
          alt=''
        />
      </MDBCol>
      <MDBCol lg='2' md='6' className='mb-4'>
        <img
          src='https://mdbootstrap.com/img/new/standard/city/047.webp'
          className='img-fluid rounded-circle'
          alt=''
        />
      </MDBCol>
      <MDBCol lg='2' md='6' className='mb-4'>
        <img
          src='https://mdbootstrap.com/img/new/standard/city/047.webp'
          className='img-fluid rounded-circle'
          alt=''
        />
      </MDBCol>
      <MDBCol lg='2' md='6' className='mb-4'>
        <img
          src='https://mdbootstrap.com/img/new/standard/city/047.webp'
          className='img-fluid rounded-circle'
          alt=''
        />
      </MDBCol>
    </MDBRow>
  );
}

export default CircleCard;
