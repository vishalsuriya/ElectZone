
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

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
    console.log("User logged in!");
    setShowLoginForm(false);
  };

  return (
    <div>
      <div className="header">
        <Link to="/">
          <h1>ElectZone</h1>
        </Link>
        <ul>
          <li>
            <input
              type="text"
              placeholder="Search"
              id="searchInput"
              name="searchInput"
            />
          </li>
          <li>
            <IoSearch />
          </li>
          <li>
            <button className="head-btn" onClick={handleLoginClick}>
              Login
            </button>
          </li>
        </ul>
      </div>

      {showLoginForm && (
        <div className="modal">
          <div className="modal-content">
            <a className="close-button" onClick={handleLoginFormClose}>
            </a>
            <form className="form-control" onSubmit={handleLoginSubmit}>
              <label>
                Username:
                <input type="text" autoComplete="off" name="username" />
              </label>
              <label>
                Password:
                <input type="password" name="password" />
              </label>
              <Link to={"/Login"}>
                <button type="submit" className="login-btn">
                  Login
                </button>
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
