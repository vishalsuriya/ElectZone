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
        <div className="menu">
          <ul>
            <li>My Profile</li>
            <li>My Cart</li>
            <li>Settings</li>
            <Link to={"/"}>
              <li>Logout</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar2;
