import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  clearPasswordResetState,
} from "../store/slices/ForgotPassSlice";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contact, setContact] = useState("");
  const { loading, error, success, message } = useSelector(
    (state) => state.passwordReset
  );

  useEffect(() => {
    return () => {
      dispatch(clearPasswordResetState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      navigate("/otpWithMail");
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contact.includes("@")) {
      await dispatch(forgotPassword(contact));
    }
  };

  return (
    <div className="forgot-pass">
      <img src="/Rectangle2.png" className="white-bg" alt="background" />
      <div className="container">
        <img className="fpback" src="back.svg" alt="back" />
        <div className="image-section">
          <img src="/fpass.svg" alt="logo" className="logo" />
        </div>
        <div className="form-section">
          <h3 className="fphead">Forgot Password</h3>
          <p className="fpp">Enter your registered email or phone number</p>

          {error && (
            <p className="error-message" style={{ color: "red" }}>
              {error}
            </p>
          )}
          {success && (
            <p className="success-message" style={{ color: "green" }}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="fpform">
              <label For="contact">Email / Phone number:</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter email/phone number"
              />
            </div>

            <button type="submit" className="fpsubmit-btn" disabled={loading}>
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
