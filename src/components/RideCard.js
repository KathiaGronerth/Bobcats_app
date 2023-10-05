import React from "react";

const RideCard = ({ ride }) => {
  return (
    <div className="ride-card">
      <h3>Driver: {ride.driverName}</h3>
      <p>From: {ride.source}</p>
      <p>To: {ride.destination}</p>
      <p>Date: {ride.date}</p>
      <p>Time: {ride.time}</p>
    </div>
  );
};

export default RideCard;
