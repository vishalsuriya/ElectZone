import React from 'react';
import { Link } from 'react-router-dom'; 
import "../Components/FooterStyle.css";
import {FaGithub, FaHome,FaLinkedin,FaMailBulk,FaPhone} from "react-icons/fa";
export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-container'>
        <div className='left'>
          <h1>Quick Links</h1>
          <ul>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/products'>Products</Link></li>
            <li><Link to='/categories'>Categories</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
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
            <a href='#'></a>
            <a href='#'></a>
            <a href='#'></a>
        
          </div>
        </div>
      </div>
      <div className='trust-elements'>
        <p>Secure Payment Methods</p>
        <img src='/images/secure-payment-icons.png' alt='Secure Payment Methods' />
      </div>
    </div>
  );
}
