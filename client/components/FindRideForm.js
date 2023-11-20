import React, { useState } from "react";
import RideListings from "./RideListings";

const FindRideForm = ({ onFilterChange, rides, filterData }) => {
  const [listing, setListing] = useState(false);
  const [formData, setFormData] = useState({
    startLocationLatitude: "",
    startLocationLongitude: "",
    endLocationLatitude: "",
    endLocationLongitude: "",
    date: "", // Initially empty
    time: "", // Initially empty
    specialNeeds: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setListing(true);
    onFilterChange(formData); // Call the passed callback function with form data
  };

  return (
    <div className="find-ride-form">
      <h2>Find a Ride</h2>
      <form onSubmit={handleSubmit}>
        {/* Latitude and Longitude Inputs */}
        <div className="input-group">
          <label>Start Location Latitude:</label>
          <input
            type="text"
            name="startLocationLatitude"
            value={formData.startLocationLatitude}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Start Location Longitude:</label>
          <input
            type="text"
            name="startLocationLongitude"
            value={formData.startLocationLongitude}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>End Location Latitude:</label>
          <input
            type="text"
            name="endLocationLatitude"
            value={formData.endLocationLatitude}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>End Location Longitude:</label>
          <input
            type="text"
            name="endLocationLongitude"
            value={formData.endLocationLongitude}
            onChange={handleChange}
          />
        </div>
        {/* Date and Time Inputs */}
        <div className="input-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
        {/* Special Needs Input */}
        <div className="input-group">
          <label>Special Needs:</label>
          <textarea
            rows="4"
            name="specialNeeds"
            value={formData.specialNeeds}
            onChange={handleChange}
            placeholder="Specify any special needs or requirements..."
          />
        </div>
        <button type="submit">Search Rides</button>
      </form>
      {listing && <RideListings rides={rides} filterData={filterData} />}
    </div>
  );
};

export default FindRideForm;
