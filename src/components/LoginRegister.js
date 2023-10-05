import React, { useState } from "react";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

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
        <div className="login-form">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button className="submit-btn">Login</button>
        </div>
      ) : (
        <div className="register-form">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button className="submit-btn">Register</button>
        </div>
      )}
    </div>
  );
};

export default LoginRegister;
