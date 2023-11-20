import React, { useState, useEffect } from "react";
import RideCard from "./RideCard";

const RideListings = ({ rides, filterData }) => {
  const [filteredRides, setFilteredRides] = useState([]);

  useEffect(() => {
    // Filter logic
    const filtered = rides.filter((ride) => {
      // Check for each filter criteria, return true if all match
      return (
        (!filterData.startLocationLatitude ||
          ride.startLocationLatitude ===
            parseFloat(filterData.startLocationLatitude)) &&
        (!filterData.startLocationLongitude ||
          ride.startLocationLongitude ===
            parseFloat(filterData.startLocationLongitude)) &&
        (!filterData.endLocationLatitude ||
          ride.endLocationLatitude ===
            parseFloat(filterData.endLocationLatitude)) &&
        (!filterData.endLocationLongitude ||
          ride.endLocationLongitude ===
            parseFloat(filterData.endLocationLongitude)) &&
        (!filterData.date || ride.date === filterData.date) &&
        (!filterData.time || ride.time === filterData.time)
        // Add any additional filter criteria here
      );
    });

    setFilteredRides(filtered);
  }, [rides, filterData]);

  return (
    <div className="ride-listings">
      <h2>Available Rides</h2>
      <div className="ride-cards">
        {filteredRides.length > 0 ? (
          filteredRides.map((ride, index) => (
            <RideCard key={index} ride={ride} />
          ))
        ) : (
          <p>No rides matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default RideListings;
