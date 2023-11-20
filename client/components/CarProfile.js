import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCar } from "../store/carsReducer";

const CarProfile = () => {
  const [carData, setCarData] = useState({
    make: "",
    model: "",
    year: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCar(carData)); // Dispatch the action to create a new car
    // Optionally, reset the form or navigate away after submission
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
