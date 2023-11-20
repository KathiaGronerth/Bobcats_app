import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRide } from "../store/ridesReducer";

const CreateRide = () => {
  const [rideData, setRideData] = useState({
    startLocationLatitude: "",
    startLocationLongitude: "",
    endLocationLatitude: "",
    endLocationLongitude: "",
    date: "",
    dateTime: "",
    availableSeats: "",
    pricePerSeat: "",
    // Add driverId if needed
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setRideData({ ...rideData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setRideData({ ...rideData, dateTime: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rideData.dateTime) {
      console.error("Date and time are required");
      return; // Optionally, show an error message to the user
    }

    const [date, time] = rideData.dateTime.split("T");
    const newRideData = { ...rideData, date, time };

    dispatch(createRide(newRideData)); // Dispatch the action to create a new ride
  };

  return (
    <div>
      <h2>Create a Ride</h2>
      <form onSubmit={handleSubmit}>
        {/* Additional input fields for latitude and longitude */}
        <div>
          <label>Start Location Latitude:</label>
          <input
            type="number"
            name="startLocationLatitude"
            value={rideData.startLocationLatitude}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Location Longitude:</label>
          <input
            type="number"
            name="startLocationLongitude"
            value={rideData.startLocationLongitude}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Location Latitude:</label>
          <input
            type="number"
            name="endLocationLatitude"
            value={rideData.endLocationLatitude}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Location Longitude:</label>
          <input
            type="number"
            name="endLocationLongitude"
            value={rideData.endLocationLongitude}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={rideData.dateTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Available Seats:</label>
          <input
            type="number"
            name="availableSeats"
            value={rideData.availableSeats}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price per Seat:</label>
          <input
            type="number"
            name="pricePerSeat"
            value={rideData.pricePerSeat}
            onChange={handleChange}
            required
          />
        </div>
        {/* Remaining fields stay the same */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateRide;
