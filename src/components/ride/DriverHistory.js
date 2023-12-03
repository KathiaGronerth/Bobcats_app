import React, { useState, useEffect } from "react";
import "./RideHistory.css";
import { GrHistory } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import ridesHistoryData from "./rideHistoryData.json";
//import ridehistory from "../../../assets/images/ridehistory.png";

const Card = ({ ride }) => {
  return (
    <div className="ride-card">
      <div className="ride-card-container">
        <p className="ride-detail">
          <FaLocationDot style={{ paddingRight: "5px", color: "#f04925" }} />
          {ride.source}
        </p>
        <p className="ride-detail">
          {ride.date} <FiCalendar />
        </p>
      </div>

      <div className="ride-card-container">
        <p className="ride-detail">
          <FaLocationDot style={{ paddingRight: "5px", color: "#f04925" }} />
          {ride.destination}
        </p>
        <p className="ride-detail">
          {ride.time} <MdAccessTime />
        </p>
      </div>
    </div>
  );
};

const DriverHistory = () => {
  const [rides, setRides] = useState({ driver: [] });

  /*useEffect(() => {
    // Simulating fetching data from API
    setRides(ridesHistoryData);
  }, []);*/

  useEffect(() => {
    const fetchRidesData = async () => {
      try {
        // Make an API call here to get the ride history data
        const access = JSON.parse(sessionStorage.getItem("access"));
        const response = await fetch("http://127.0.0.1:8000/api/ride", {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setRides(data);
        } else {
          console.error(
            "Failed to fetch ride history. Server returned:",
            response.status,
            response.statusText
          );
        }
        // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching ride data:", error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchRidesData();
  }, []);

  return (
    <div className="ride-page">
      <h2 className="rides-page-title">
        Driver Ride History <GrHistory style={{ paddingLeft: "5px" }} />
      </h2>
      <div className="ride-container">
        {rides.driver?.length > 0 ? (
          rides.driver.map((ride) => <Card key={ride.id} ride={ride} />)
        ) : (
          <div className="ride-container-no-history">
            <img
              src={ridehistory}
              alt="Reserve a Ride"
              className="ride-option-image"
            />
            <p>No ride history available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverHistory;
