import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/images/logo.png";
import { FaUserAlt } from "react-icons/fa";
import {
  IoIosAddCircleOutline,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          <div className="nav-item">Ride</div>
          <div to="" className="nav-item">
            Help
          </div>
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
        <div className="nav-user" ref={dropdownRef}>
          <div className="nav-item" onClick={handleDropdownToggle}>
            <FaUserAlt className="user-profile-icon" />
            <IoIosArrowDown
              style={{ paddingLeft: "5px", paddingBottom: "7px" }}
            />
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/login" className="dropdown-item">
                Log in <IoIosArrowForward style={{ paddingLeft: "45px" }} />
              </Link>
              <Link to="/register" className="dropdown-item">
                Sign Up <IoIosArrowForward style={{ paddingLeft: "35px" }} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
