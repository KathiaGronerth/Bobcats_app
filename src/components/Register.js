import React, { useState } from "react";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import cover_photo from "../../public/images/default_cover_photo.jpg";

const Register = () => {
  const navigate = useNavigate();

  // State for registration
  const [fullName, setFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [phone, setPhone] = useState("");

  // State variables for car details
  const [hasCar, setHasCar] = useState(false);
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carYear, setCarYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Create the request body
    const requestBody = {
      name: fullName,
      email: registerEmail,
      password: registerPassword,
      phone: phone,
      has_car: hasCar,
      cars: hasCar
        ? [
            {
              model: carModel,
              make: carMake,
              color: carColor,
              year: carYear,
              license_plate: licensePlate,
            },
          ]
        : [],
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Registration successful
        const formData = new FormData();
        formData.append("email", registerEmail);
        formData.append("profile_photo", photo);
        formData.append("cover_photo", cover_photo);
        const imageResponse = await fetch("http://127.0.0.1:8000/api/image", {
          method: "POST",
          body: formData,
        }).then((imageResponse) => {
          // Handle the response
          if (!imageResponse.ok) {
            throw new Error("Network response was not ok.");
          }
          console.log(imageResponse.json());
        });
        alert("Registration successful!");
        navigate("/login");
      } else {
        // Registration failed
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  const handleLogin = () => {
    // Navigate to the Register page
    navigate("/login");
  };

  return (
    <div className="main-login-register">
      <div className="login-register">
        <form onSubmit={handleRegister} className="register-form">
          <h2 className="login-register-title">
            Sign up <MdLogin style={{ color: "#98ed64" }} />
          </h2>
          <div style={{ textAlign: "center", fontSize: "14px" }}>
            Your Journey, Your Way – Sign Up with Bobcat Carpool!
          </div>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="login-register-input"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            className="login-register-input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            className="login-register-input"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="login-register-input"
            required
          />
          <input
            type="number"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="login-register-input"
            required
          />
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="login-register-input"
            placeholder="Upload your photo"
          />
          {/* New Car fields */}
          <div className="car-question">
            <div>Do you have a car?</div>
            <button
              type="button"
              onClick={() => setHasCar(true)}
              className={hasCar === true ? "active" : ""}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setHasCar(false)}
              className={hasCar === false ? "active" : ""}
            >
              No
            </button>
          </div>

          {hasCar && (
            <>
              <input
                type="text"
                placeholder="Car Model"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="login-register-input"
              />
              <input
                type="text"
                placeholder="Car Make"
                value={carMake}
                onChange={(e) => setCarMake(e.target.value)}
                className="login-register-input"
              />
              <input
                type="text"
                placeholder="Car Color"
                value={carColor}
                onChange={(e) => setCarColor(e.target.value)}
                className="login-register-input"
              />
              <input
                type="number"
                placeholder="Car Year"
                value={carYear}
                onChange={(e) => setCarYear(e.target.value)}
                className="login-register-input"
              />
              <input
                type="text"
                placeholder="License Plate"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                className="login-register-input"
              />
            </>
          )}
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
          <div
            style={{ textAlign: "center", margin: "15px", fontSize: "14px" }}
          >
            -------------OR-------------
          </div>
          <div style={{ paddingLeft: "5px", fontSize: "14px", margin: "0px" }}>
            Already have an account?
          </div>
          <button
            type="button"
            className="signup-btn"
            style={{ background: "#054957" }}
            onClick={handleLogin}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
