import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";

const RegisterAsDriverForm = () => {
  const [name, setName] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [license, setLicense] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const access = JSON.parse(sessionStorage.getItem("access"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://127.0.0.1:8000/api/profile"; // Replace with your actual API endpoint
    const profile = JSON.parse(sessionStorage.getItem("profile"));
    console.log("bio", profile.bio);
    console.log("phone");
    console.log("speaks", profile.speaks);

    const requestBody = {
      bio: profile.bio,
      phone: profile.phone,
      speaks: profile.speaks,
      studies: profile.studies,
      from_location: profile.from_location,
      has_car: true,
      cars: [
        {
          model: model,
          make: make,
          color: color,
          year: year,
          license_plate: license,
        },
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("POST request successful:", data);
        const currentUserData = JSON.parse(sessionStorage.getItem("userData"));
        currentUserData.has_car = true;
        sessionStorage.setItem("userData", JSON.stringify(currentUserData));
        // Show the success modal
        setIsModalOpen(true);
      } else {
        console.error("POST request failed! Status:", response.status);
        // Handle error for the POST request if needed
      }
    } catch (error) {
      // Handle errors for the POST request
      console.error("Error making POST request:", error.message);
    }
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
        <h2>Register your car</h2>
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
            <label>Vehicle Year:</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter vehicle year..."
            />
          </div>

          <div className="input-group">
            <label>Vehicle Color:</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Enter vehicle color..."
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
