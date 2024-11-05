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
      navigate("/otp-forgot-password");
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contact.includes("@")) {
      localStorage.setItem("recoveryEmail", contact);
      await dispatch(forgotPassword(contact));
    }
  };

  return (
    <div className="forgot-pass">
      <img src="/Rectangle2.png" className="white-bg" alt="background" />
      <img
        src="/bgMobile.png"
        className="block md:hidden white-bgMobile"
        alt="background"
      />
      <div className="container">
        <a href="#" onClick={() => navigate("/")}>
          <img className="fpback" src="back.svg" alt="back" />
        </a>
        <div className="image-section1">
          <img src="/fpass.svg" alt="logo" className="logo" />
        </div>
        <div className="form-section1">
          <h3 className="fphead">Forgot Password</h3>
          <p className="fpp">Enter your registered email</p>

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
              <label For="contact">Email:</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter email"
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
