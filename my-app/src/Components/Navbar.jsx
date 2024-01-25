import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import '../Components/NavbarStyle.css';
function Navbar() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleLoginClick = () => {
    setShowLoginForm(true);
  };
  const handleLoginFormClose = () => {
    setShowLoginForm(false);
  };
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log('User logged in!');
    setShowLoginForm(false);
  };

  return (
    <div className='header'>
      <Link to="/">
        <h1>ElectZone</h1>
      </Link>
      <ul>
        <li>
          <input type='text' placeholder='Search' id='searchInput' name='searchInput' />
        </li>
        <li>
          <IoSearch />
        </li>
        {showLoginForm ? (
          <li>
            <div className="login-form-container">
              <form onSubmit={handleLoginSubmit}>
                <label>
                  Username:
                  <input type="text" autoComplete='off' name="username" />
                </label>
                <label>
                  Password:
                  <input type="password" name="password" />
                </label>
              <Link to={"/Login"}> <button type="submit">Submit</button></Link> 
                <button type="button" onClick={handleLoginFormClose}>Close</button>
              </form>
            </div>
          </li>
        ) : (
          <li>
            <button onClick={handleLoginClick}>Login</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
