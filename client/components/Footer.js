import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link to="/" className="footer-logo">
          Bobcat Carpool
        </Link>
        <div className="footer-links">
          <Link to="/about" className="footer-item">
            About
          </Link>
          <Link to="/how-it-works" className="footer-item">
            How It Works
          </Link>
          <Link to="/contact" className="footer-item">
            Contact
          </Link>
        </div>
      </div>
      <div className="footer-copyright">
        © {new Date().getFullYear()} Bobcat Carpool. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
