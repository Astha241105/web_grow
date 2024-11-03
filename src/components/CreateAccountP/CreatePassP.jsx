import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../store/slices/accountslice";
import { useNavigate } from "react-router-dom";
import "./CreateAccountP.css";

const CreatePassP = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { firstName, lastName, email, phone, status } = useSelector(
    (state) => state.account
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setCheckboxError("Please accept the terms and conditions to proceed");
      setError("");
      return;
    }

    setError("");
    dispatch(createAccount({ firstName, lastName, email, phone, password }))
      .then(() => {
        navigate("/otpWithMail");
      })
      .catch((err) => setError("Failed to register. Try again."));
  };

  const handleCheckboxChange = (e) => {
    setAcceptTerms(e.target.checked);
    if (e.target.checked) {
      setCheckboxError("");
    }
  };

  return (
    <div className="forgot-pass">
      <img src="/Rectangle2.png" className="white-bg" alt="background" />
      <div className="container">
        <div className="image-section">
          <img src="/createnew.svg" alt="logo" className="logo" />
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
                type="password"
                id="Password"
                placeholder="Enter Password"
                className="pswd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img src="/eye.svg" alt="eye" className="arrow1" />

              <label htmlFor="ConfirmPassword" className="block mb-1">
                Confirm Password:
              </label>
              <input
                type="password"
                id="ConfirmPassword"
                placeholder="Confirm Password"
                className="pswd"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <img src="/eye.svg" alt="eye" className="arrow2" />
            </div>

            {error && <p className="error-message">{error}</p>}

            <label className="square"> </label>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={handleCheckboxChange}
            />
            <p className="pass-para">
              All your information is collected, stored, and processed as per
              our data processing guidelines. By signing up you agree to our{" "}
              <span>Privacy Policy</span> and <span>Terms & Conditions</span>.
            </p>
            
            <button type="submit" className="pass-button" disabled={status === "loading"}>
              {status === "loading" ? "Sending OTP..." : "GET OTP"}
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

export default CreatePassP;
