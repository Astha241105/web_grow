import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHostDetails, registerHost } from "../store/slices/hostslice"; 
import { useNavigate } from "react-router-dom";
import "./CreatePass.css";

const CreatePass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const existingHostDetails = useSelector((state) => state.host);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const updatedHostDetails = {
      ...existingHostDetails,
      password,
    };

   
    dispatch(updateHostDetails(updatedHostDetails));

  
    dispatch(registerHost(updatedHostDetails));
    navigate("/otp-host");
  };

  return (
    <div className="forgot-pass">
      <img src="/Rectangle2.png" className="white-bg" alt="background" />
      <div className="container">
        <div className="image-section">
          <img src="/cah.svg" alt="logo" className="logo" />
          <img src="back.svg" className="cn-home" />
        </div>
        <div className="form-section2">
          <h3 className="cnhead">Create your account</h3>
          <form onSubmit={handleSubmit}>
            <div className="cnform2">
              <label htmlFor="Password" className="block mb-1">
                Password:
              </label>
              <input
                id="Password"
                type="password"
                placeholder="Enter Password"
                className="pswd"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <img src="/eye.svg" alt="eye" className="arrow1" />

              <label htmlFor="ConfirmPassword" className="block mb-1">
                Confirm Password:
              </label>
              <input
                id="ConfirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="pswd"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <img src="/eye.svg" alt="eye" className="arrow2" />

              {error && <p className="error-message">{error}</p>}
            </div>

            <img src="square.svg" className="square" alt="checkbox" />
            <p className="pass-para">
              All your information is collected, stored, and processed as per our
              data processing guidelines. By signing up, you agree to our{" "}
              <span>Privacy Policy</span> and <span>Terms & Conditions</span>.
            </p>
            <button type="submit" className="pass-button">
              Get OTP
            </button>

            <p className="signin-link">
              Already have an account?{" "}
              <a href="/" className="sign-in">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePass;
