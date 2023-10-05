import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
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
            🚹
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
