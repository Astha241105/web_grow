import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHostDetails, registerHost } from "../store/slices/hostslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";  // Import Toastify
import "react-toastify/dist/ReactToastify.css";  // Import CSS for Toastify
import "./CreatePass.css";

const CreatePass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingHostDetails = useSelector((state) => state.host);

  // Regex for Password Validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setAcceptTerms(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = () => {
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be 8-16 characters, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match.");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions.");
      toast.error("Please accept the terms and conditions.");
      return;
    }

    if (!validatePassword()) return;

    setError("");
    setIsSubmitting(true);

    const updatedHostDetails = {
      ...existingHostDetails,
      password,
      role: "host",
    };

    dispatch(updateHostDetails(updatedHostDetails));
    dispatch(registerHost(updatedHostDetails))
    .then(() => {
      navigate("/otp-host");
    })
    .catch((error) => {
      // Handle errors from the API call
      toast.error(`Error: ${error.response?.data?.message || "Something went wrong"}`);
      setIsSubmitting(false);
    });
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
          <img src="/create_account.svg" alt="logo" className="logo" />
          <a href="#" onClick={() => navigate("/create-account-host")}>
            <img src="back.svg" className="cn-home hidden md:block"  />
          </a>
        </div>
        <div className="form-section1">
          <h3 className="cnhead">Create your account</h3>
          <form onSubmit={handleSubmit}>
            <div className="cnform">

              <label htmlFor="Password" className="block mb-1">
                Password:
              </label>
              <div className="relative">
                <input
                  id="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="pswd"
                  value={password}
                  onChange={handlePasswordChange}
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
                  id="ConfirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="pswd"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <img
                  src={showConfirmPassword ? "/eye-open.svg" : "/eye-cross.svg"}
                  alt={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-[4%] transform -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity eye"
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
            <p className="pass-para1">
              All your information is collected, stored, and processed as per
              our data processing guidelines. By signing up, you agree to our{" "}
              <span>Privacy Policy</span> and <span>Terms & Conditions</span>.
            </p>

            <button
              type="submit"
              className="pass-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Getting OTP..." : "Get OTP"}
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
