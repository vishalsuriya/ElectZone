import React from 'react';
import { Link } from 'react-router-dom'; 
import "../Components/FooterStyle.css";
import { FaFacebook,FaSquareTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-container'>
        <div className='left'>
          <h1>Quick Links</h1>
          <ul>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/About'>About Us</Link></li>
            <li><Link to='/Contact'>Contact Us</Link></li>
            <li><Link to='/privacy'>Privacy Policy</Link></li>
          </ul>
        </div>
        <div className='center'>
          <h1>Feedback</h1>
      <textarea  className = "text-area"typeof='text' placeholder='enter your message'></textarea>
      <button id='summit-btn'>Summit</button>
        </div>
        <div className='right'>
          <h1>Stay Connected</h1>
          <p>this is our address</p>
          <div className='social-links'>
            <a href=''><FaFacebook /></a>
            <a href=''><GrInstagram/></a>
            <a href=''><FaSquareTwitter/></a>
          </div>
        </div>
      </div>
    </div>
  );
}
