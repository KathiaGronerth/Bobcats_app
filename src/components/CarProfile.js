import React, { useState } from "react";

const CarProfile = () => {
  const [carData, setCarData] = useState({
    make: "",
    model: "",
    year: "",
  });

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save car profile logic goes here
  };

  return (
    <div>
      <h2>Car Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Make:</label>
          <input
            type="text"
            name="make"
            value={carData.make}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={carData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={carData.year}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CarProfile;
