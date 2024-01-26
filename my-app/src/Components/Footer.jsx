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
            <li><Link to='/categories'>Categories</Link></li>
            <li><Link to='/Contact'>Contact Us</Link></li>
          </ul>
        </div>
        <div className='center'>
          <h1>Customer Service</h1>
          <ul>
            <li><Link to='/faq'>FAQ</Link></li>
            <li><Link to='/shipping'>Shipping</Link></li>
            <li><Link to='/returns'>Returns</Link></li>
            <li><Link to='/privacy'>Privacy Policy</Link></li>
          </ul>
        </div>
        <div className='right'>
          <h1>Stay Connected</h1>
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
