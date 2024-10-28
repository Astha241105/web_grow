import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../changepass.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/otpWithMail");
  };

  return (
    <div className="login">
      <img
        src="../../public/assets/Rectangle2.png"
        className="white-bg"
        alt="background"
      />
      <div className="container">
        <div className="image-section">
          <img src="../src/assets/side1.png" alt="logo" className="logo" />
        </div>
        <div className="form-section">
          <h3>Welcome Back!</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="forgot-password">
              <a href="/changepass">Forgot Password?</a>
            </div>

            <button type="submit">Log In</button>

            <p className="signup-link">
              Don't have an account? <a href="/signup">Create account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
