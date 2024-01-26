// Navbar2.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import "../Components/NavbarStyle.css";

function Navbar2() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="header">
      <h1>ElectZone</h1>
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
        </li>
        <li>
          <BsCartCheckFill />
        </li>
        <li onClick={handleMenuClick}>
          <FaBars />
        </li>
      </ul>
      {showMenu && (
        <div className="dropdown-menu">
          <ol>
            <li className="menu-item">
              <Link to="/profile">My Profile</Link>
            </li>
            <li className="menu-item">
              <Link to="/cart">My Cart</Link>
            </li>
            <li className="menu-item">
              <Link to="/settings">Settings</Link>
            </li>
            <li className="menu-item">
              <Link to="/">
               <li className="menu-item">Logout</li>
              </Link>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}

export default Navbar2;
