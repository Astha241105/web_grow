import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.contact.value;
    if (input.includes("@")) {
      navigate("/otpWithMail");
    } else {
      navigate("/otpWithPhone");
    }
  };

  return (
    <div className="forgot-pass">
      <img src="/Rectangle2.png" className="white-bg" alt="background" />
      <div className="container">
        <div className="image-section">
          <img src="/side1.png" alt="logo" className="logo" />
        </div>
        <div className="form-section">
          <h1>Forgot Password</h1>
          <p>Enter your registered email or phone number</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact">Email / Phone number:</label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Enter email/phone number"
              />
            </div>

            <button type="submit" className="submit-btn">
              Get OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
