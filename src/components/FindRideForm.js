import React, { useState } from "react";

const FindRideForm = () => {
  // Using dummy data for the fields as initial values
  const [startLocation, setStartLocation] = useState("New York City");
  const [destination, setDestination] = useState("Boston");
  const [dateTime, setDateTime] = useState("2023-11-01T12:00");
  const [specialNeeds, setSpecialNeeds] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic here (e.g., call an API or update state)
    console.log({ startLocation, destination, dateTime, specialNeeds });
  };

  return (
    <div className="find-ride-form">
      <h2>Find a Ride</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Starting Location:</label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="Enter starting location"
          />
        </div>
        <div className="input-group">
          <label>Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
        </div>
        <div className="input-group">
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Special Needs:</label>
          <textarea
            rows="4"
            value={specialNeeds}
            onChange={(e) => setSpecialNeeds(e.target.value)}
            placeholder="Specify any special needs or requirements..."
          />
        </div>
        <button type="submit">Search Rides</button>
      </form>
    </div>
  );
};

export default FindRideForm;
