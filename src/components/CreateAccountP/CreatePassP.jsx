import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAccount,
  setPasswordDetails,
} from "../store/slices/accountslice";
import { useNavigate } from "react-router-dom";
import "./CreateAccountP.css";

const CreatePassP = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    email,
    mobile,
    organization,
    designation,
    role,
    status,
  } = useSelector((state) => state.account);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setError("Please agree to terms and conditions.");
      return;
    }

    setError("");

    dispatch(setPasswordDetails({ password, confirmPassword }));
    dispatch(
      createAccount({
        firstName,
        lastName,
        email,
        mobile,
        password,
        organization,
        designation,
        role,
      })
    )
      .then(() => {
        navigate("/otpWithMail");
      })
      .catch((err) => setError("Failed to register. Try again."));
  };

  const handleCheckboxChange = (e) => {
    setAcceptTerms(e.target.checked);
    if (e.target.checked) {
      setError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
        <div className="image-section">
          <img src="/createnew.svg" alt="logo" className="logo" />
          <a href="#" onClick={() => navigate("/create-account-participant")}>
            <img src="back.svg" className="cn-home hidden md:block" />
          </a>
        </div>
        <div className="form-sec">
          <h3 className="cnhead">Create your account</h3>
          <form onSubmit={handleSubmit}>
            <div className="cnform">
              {error && <p className="error-message"><img src="/caution.png"></img>{error}</p>}
              <label htmlFor="Password" className="block mb-1">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  placeholder="Enter Password"
                  className="pswd"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img
                  src={showPassword ? "/eye-open.svg" : "/eye-cross.svg"}
                  alt={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-[4%] transform -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity eye"
                  onClick={togglePasswordVisibility}
                />
              </div>

              <label htmlFor="ConfirmPassword" className="block mb-1">
                Confirm Password:
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="ConfirmPassword"
                  placeholder="Confirm Password"
                  className="pswd"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <img
                  src={showConfirmPassword ? "/eye-open.svg" : "/eye-cross.svg"}
                  alt={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity eye"
                  onClick={toggleConfirmPasswordVisibility}
                />
              </div>
            </div>

            <label className="square">
              <input
                className="box"
                type="checkbox"
                checked={acceptTerms}
                onChange={handleCheckboxChange}
              />
            </label>
            <p className="pass-para">
              All your information is collected, stored, and processed as per
              our data processing guidelines. By signing up you agree to our{" "}
              <span>Privacy Policy</span> and <span>Terms & Conditions</span>.
            </p>

            <button
              type="submit"
              className="pass-button"
              disabled={status === "loading"}
            >
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
