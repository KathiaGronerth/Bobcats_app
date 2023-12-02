import React, { useState } from "react";

const RegisterAsDriverForm = () => {
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [license, setLicense] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the registration logic here (e.g., call an API or update state)
    console.log({ name, vehicle, license });
  };

  return (
    <div className="register-driver-form-main">
      <div className="register-driver-form">
        <h2>Register as a Driver</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="input-group">
            <label>Vehicle Details:</label>
            <input
              type="text"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              placeholder="Enter vehicle make, model, etc."
            />
          </div>
          <div className="input-group">
            <label>License Number:</label>
            <input
              type="text"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              placeholder="Enter your license number"
            />
          </div>
          <button type="submit" className="register-driver-form-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAsDriverForm;
