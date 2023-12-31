import React, { useState } from "react";

const CreateRide = () => {
  const [rideData, setRideData] = useState({
    source: "",
    destination: "",
    date: "",
    time: "",
    seats: "",
    pricePerSeat: "",
  });

  const handleChange = (e) => {
    setRideData({ ...rideData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setRideData({ ...rideData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save ride logic goes here
    console.log(rideData);
  };

  return (
    <div>
      <h2>Create a Ride</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Source:</label>
          <input
            type="text"
            name="source"
            value={rideData.source}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            value={rideData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            value={rideData.date}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div>
          <label>Available Seats:</label>
          <input
            type="number"
            name="seats"
            value={rideData.seats}
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateRide;
