import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/images/logo.png";
import { FaUserAlt } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo-img">
          <img
            src={logoImage}
            alt="Bobcat Carpool Logo"
            style={{ width: "55px", height: "auto" }}
          />
        </div>
        <Link to="/" className="nav-logo">
          Bobcat Carpool
        </Link>
        <div className="nav-search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="nav-links">
          <Link to="/about" className="nav-item">
            About
          </Link>
          <Link to="/how-it-works" className="nav-item">
            How It Works
          </Link>
          <Link to="/contact" className="nav-item">
            Contact
          </Link>
          <Link to="/faq" className="nav-item">
            FAQ
          </Link>
        </div>
        <div className="nav-user">
          <Link to="/login" className="nav-item user-profile-icon">
            <FaUserAlt />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
