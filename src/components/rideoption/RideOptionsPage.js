import React from "react";
import { Link } from "react-router-dom";
import findRideImage from "../../../assets/images/background.png";
import reserveRideImage from "../../../assets/images/publishride.png";
import "./RideOptionsPage.css"; // Import your custom styles
import { useNavigate } from "react-router-dom";

const userDataString = sessionStorage.getItem("userData");
const userData = JSON.parse(userDataString);

const RideOptionsPage = () => {
  const navigate = useNavigate();
  const handlefindride = () => {
    navigate("/find-ride-form");
  };

  const handlecreateride = () => {
    if (userData?.has_car) {
      navigate("/post-ride-form");
    } else {
      navigate("/register-as-driver-form");
    }
  };
  return (
    <div className="ride-options-page">
      <h1>Choose Your Ride Option</h1>
      <div className="ride-options-container">
        <div className="ride-option">
          <div className="ride-card">
            <img
              src={findRideImage}
              alt="Find Ride"
              className="ride-option-image"
            />
            <button className="ride-option-button" onClick={handlefindride}>
              Find a Ride
            </button>
          </div>
        </div>

        <div className="ride-option">
          <div className="ride-card">
            <img
              src={reserveRideImage}
              alt="Reserve a Ride"
              className="ride-option-image"
            />
            <button className="ride-option-button" onClick={handlecreateride}>
              Create a Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideOptionsPage;
