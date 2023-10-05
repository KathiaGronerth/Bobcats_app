import React, { useState } from "react";

const PostRideForm = () => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    time: "",
    seats: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send this data to your backend or handle appropriately
    console.log(formData);
  };

  return (
    <div className="post-ride-form-wrapper">
      <h2>Post Your Ride</h2>
      <form onSubmit={handleSubmit} className="post-ride-form">
        <input
          type="text"
          name="source"
          value={formData.source}
          onChange={handleInputChange}
          placeholder="Source"
          required
        />
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleInputChange}
          placeholder="Destination"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="seats"
          value={formData.seats}
          onChange={handleInputChange}
          placeholder="Available Seats"
          min="1"
          required
        />
        <button type="submit" className="post-ride-submit-btn">
          Post Ride
        </button>
      </form>
    </div>
  );
};

export default PostRideForm;
