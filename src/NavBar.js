import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/images/logo.png";
import { FaUserAlt } from "react-icons/fa";
import {
  IoIosAddCircleOutline,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { FaCalendarDays } from "react-icons/fa6";
const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isHelpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [isRideDropdownOpen, setRideDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const ridedropdownRef = useRef(null);
  const helpdropdownRef = useRef(null);

  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setDropdownOpen((prevState) => !prevState);

    if (isRideDropdownOpen) {
      setRideDropdownOpen((prevState) => !prevState);
    }

    if (isHelpDropdownOpen) {
      setHelpDropdownOpen((prevState) => !prevState);
    }
  };

  const handleHelpDropdownToggle = (event) => {
    event.stopPropagation();
    console.log("Before", isHelpDropdownOpen);
    setHelpDropdownOpen((prevState) => !prevState);
    if (isRideDropdownOpen) {
      setRideDropdownOpen((prevState) => !prevState);
    }
    if (isDropdownOpen) {
      setDropdownOpen((prevState) => !prevState);
    }
  };

  const handleRideDropdownToggle = (event) => {
    event.stopPropagation();
    console.log("Before", isRideDropdownOpen);
    setRideDropdownOpen((prevState) => !prevState);
    if (isHelpDropdownOpen) {
      setHelpDropdownOpen((prevState) => !prevState);
    }

    if (isDropdownOpen) {
      setDropdownOpen((prevState) => !prevState);
    }
  };

  useEffect(() => {
    console.log("After", isHelpDropdownOpen);
  }, [isHelpDropdownOpen]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }

    if (
      ridedropdownRef.current &&
      !ridedropdownRef.current.contains(event.target)
    ) {
      setRideDropdownOpen(false);
    }

    if (
      helpdropdownRef.current &&
      !helpdropdownRef.current.contains(event.target)
    ) {
      setHelpDropdownOpen(false);
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
          <Link className="nav-item" to="/calendar">
            Calendar <FaCalendarDays style={{ paddingLeft: "5px" }} />
          </Link>
          <div
            className="nav-item ride-dropdown"
            onClick={handleRideDropdownToggle}
            ref={ridedropdownRef}
          >
            Ride <IoIosArrowDown style={{ paddingLeft: "5px" }} />
            {isRideDropdownOpen && (
              <div className="submenu">
                <Link
                  to="/find-ride-form"
                  className="submenu-item"
                  onClick={(event) => handleRideDropdownToggle(event)}
                >
                  Find a Ride
                </Link>
                <Link
                  to="/post-ride-form"
                  className="submenu-item"
                  onClick={(event) => handleRideDropdownToggle(event)}
                >
                  Create a Ride
                </Link>
              </div>
            )}
          </div>

          <div
            className="nav-item help-dropdown"
            onClick={handleHelpDropdownToggle}
            ref={helpdropdownRef}
          >
            Help <IoIosArrowDown style={{ paddingLeft: "5px" }} />
            {isHelpDropdownOpen && (
              <div className="submenu">
                <Link
                  to="/how-it-works"
                  className="submenu-item"
                  onClick={(event) => handleHelpDropdownToggle(event)}
                >
                  How It Works
                </Link>
                <Link
                  to="/faq"
                  className="submenu-item"
                  onClick={(event) => handleHelpDropdownToggle(event)}
                >
                  FAQ
                </Link>
                <Link
                  to="/contact"
                  className="submenu-item"
                  onClick={(event) => handleHelpDropdownToggle(event)}
                >
                  Contact
                </Link>
                <Link
                  to="/about"
                  className="submenu-item"
                  onClick={(event) => handleHelpDropdownToggle(event)}
                >
                  About
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="nav-user" ref={dropdownRef}>
          <div
            className="nav-item login-dropdown"
            onClick={handleDropdownToggle}
          >
            <FaUserAlt className="user-profile-icon" />
            <IoIosArrowDown
              style={{ paddingLeft: "5px", paddingBottom: "7px" }}
            />
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to="/login"
                className="dropdown-item"
                onClick={(event) => handleDropdownToggle(event)}
              >
                Log in <IoIosArrowForward style={{ paddingLeft: "45px" }} />
              </Link>
              <Link
                to="/register"
                className="dropdown-item"
                onClick={(event) => handleDropdownToggle(event)}
              >
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
