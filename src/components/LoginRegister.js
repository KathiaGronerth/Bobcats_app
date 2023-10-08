import React, { useState } from "react";

const LoginRegister = () => {
  // State for toggle
  const [isLogin, setIsLogin] = useState(true);

  // State for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for registration
  const [fullName, setFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [username, setUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);

  // State variables for car details
  const [hasCar, setHasCar] = useState(false);
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carYear, setCarYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy data for login
    const dummyEmail = "admin@example.com";
    const dummyPassword = "admin123";

    if (email === dummyEmail && password === dummyPassword) {
      alert("Logged in successfully!");
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Dummy registration logic
    if (
      fullName &&
      registerEmail &&
      username &&
      registerPassword &&
      confirmPassword
    ) {
      if (registerPassword !== confirmPassword) {
        alert("Passwords do not match!");
      } else {
        alert("Registration successful!");
        if (photo) {
          alert(`Uploaded photo: ${photo.name}`);
        }
      }
    } else {
      alert("Please fill in all registration fields!");
    }
  };

  return (
    <div className="login-register">
      <div className="toggle-buttons">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "active" : ""}
        >
          Register
        </button>
      </div>

      {isLogin ? (
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            type="file"
            accept=".jpg"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          {/* New Car fields */}
          <div className="car-question">
            <label>Do you have a car?</label>
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
              />
              <input
                type="text"
                placeholder="Car Make"
                value={carMake}
                onChange={(e) => setCarMake(e.target.value)}
              />
              <input
                type="text"
                placeholder="Car Color"
                value={carColor}
                onChange={(e) => setCarColor(e.target.value)}
              />
              <input
                type="number"
                placeholder="Car Year"
                value={carYear}
                onChange={(e) => setCarYear(e.target.value)}
              />
              <input
                type="text"
                placeholder="License Plate"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </>
          )}
          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginRegister;
