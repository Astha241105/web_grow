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
        <img className="fpback" src="back.svg" />
        <div className="image-section">
          <img src="/fpass.svg" alt="logo" className="logo" />
        </div>
        <div className="form-section">
          <h3 className="fphead">Forgot Password</h3>
          <p className="fpp">Enter your registered email or phone number</p>

          <form onSubmit={handleSubmit}>
            <div className="fpform">
              <label For="contact">Email / Phone number:</label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Enter email/phone number"
              />
            </div>

            <button type="submit" className="fpsubmit-btn">
              Get OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
