import React from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import "../Components/CircleCardStyle.css";

function CircleCard() {
  return (
    <MDBRow className='custom-center-class'>
      <MDBCol lg='2' md='4' className='mb-4'>
        <div className='circular-image-container'>
          <img
            src='https://mdbootstrap.com/img/new/standard/city/047.webp'
            className='img-fluid'
            alt=''
          />
          <a className='text-center' href="#">IC</a>
        </div>
      </MDBCol>
      <MDBCol lg='2' md='4' className='mb-4'>
        <div className='circular-image-container'>
          <img
            src='https://mdbootstrap.com/img/new/standard/city/047.webp'
            className='img-fluid'
            alt=''
          />
          <a className='text-center' href="#">IC</a>
        </div>
      </MDBCol>
      <MDBCol lg='2' md='4' className='mb-4'>
        <div className='circular-image-container'>
          <img
            src='https://mdbootstrap.com/img/new/standard/city/047.webp'
            className='img-fluid'
            alt=''
          />
          <a className='text-center' href="#">IC</a>
        </div>
      </MDBCol>
      <MDBCol lg='2' md='4' className='mb-4'>
        <div className='circular-image-container'>
          <img
            src='https://mdbootstrap.com/img/new/standard/city/047.webp'
            className='img-fluid'
            alt=''
          />
          <a className='text-center' href="#">IC</a>
        </div>
      </MDBCol>
      <MDBCol lg='2' md='4' className='mb-4'>
        <div className='circular-image-container'>
          <img
            src='https://mdbootstrap.com/img/new/standard/city/047.webp'
            className='img-fluid'
            alt=''
          />
          <a className='text-center' href="#">IC</a>
        </div>
      </MDBCol>
    </MDBRow>
  );
}

export default CircleCard;
