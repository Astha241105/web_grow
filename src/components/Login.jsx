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
        src="/Rectangle2.png"
        className="white-bg hidden md:block"
        alt="background"
      />
      <img
        src="/bgMobile.png"
        className="block md:hidden  white-bgMobile "
        alt="background"
      />
      <div className="container">
        <div className="image-section">
          <img src="/side1.png" alt="logo" className="logo  " />
        </div>

        <div className="form-section ">
          <img src="/cross.svg" alt="cross" className="cross hidden md:block" />
          <h3 className="heading w-[300px] md:w-[392px]">Welcome Back!</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Username:</label>
              <input
                className="username-input"
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group relative">
              <label className="label">Password:</label>

              <input
                className="password-input"
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              <img
                src="/eye.svg"
                alt="eye"
                className="absolute bottom-[20%] right-[4%]"
              />
            </div>

            <div className="forgot-password">
              <a href="/changepass">Forgot Password?</a>
            </div>

            <button className="btn" type="submit">
              Log In
            </button>

            <p className="signup-link">
              Don't have an account?{" "}
              <a href="/signup" className="create-account">
                Create account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
