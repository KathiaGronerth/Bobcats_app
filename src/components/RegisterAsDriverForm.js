import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";

const RegisterAsDriverForm = () => {
  const [name, setName] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [license, setLicense] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the registration logic here (e.g., call an API or update state)
    console.log({ name, vehicle, license });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleCreateRide = () => {
    navigate("/post-ride-form");
  };
  const handleHomePage = () => {
    navigate("/");
  };
  const handleRegisterVehicle = () => {
    // Show the modal after the request is submitted
    setIsModalOpen(true);
  };

  return (
    <div className="register-driver-form-main">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Event Options"
        overlayClassName="modal-overlay"
        className="modal"
      >
        <h2>Your car has been successfully registered!</h2>
        <div className="button-container">
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleCreateRide}>
            Create a Ride <FaCar />
          </button>
        </div>
      </Modal>
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
            <label>Vehicle Make:</label>
            <input
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              placeholder="Enter vehicle make..."
            />
          </div>
          <div className="input-group">
            <label>Vehicle Model:</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Enter vehicle model..."
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
          <button
            type="submit"
            className="register-driver-form-button"
            onClick={handleRegisterVehicle}
          >
            {" "}
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAsDriverForm;
