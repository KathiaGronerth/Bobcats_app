import React, { useState } from "react";
import RideCard from "./RideCard";

const RideListings = ({ rides }) => {
  const [filteredRides, setFilteredRides] = useState(rides);

  const handleSort = (method) => {
    let sortedRides = [...filteredRides];
    if (method === "date") {
      sortedRides.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    // Add other sorting methods as needed
    setFilteredRides(sortedRides);
  };

  return (
    <div className="ride-listings">
      <h2>Available Rides</h2>
      <div className="ride-filters">
        <button onClick={() => handleSort("date")}>Sort by Date</button>
        {/* Add other filter buttons as needed */}
      </div>
      <div className="ride-cards">
        {filteredRides.map((ride, index) => (
          <RideCard key={index} ride={ride} />
        ))}
      </div>
    </div>
  );
};

export default RideListings;
