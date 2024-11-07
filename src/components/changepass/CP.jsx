import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../store/slices/fpchangeslice";
import "./changepass.css";

const Changepass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { email, verifiedOtp } = useSelector((state) => state.fpotp);
  const { isLoading, error } = useSelector((state) => state.fpchange);
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setLocalError("");
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePasswords = () => {
    if (!passwords.newPassword || !passwords.confirmPassword) {
      setLocalError("Both password fields are required");
      return false;
    }
    if (passwords.newPassword.length < 6) {
      setLocalError("Password must be at least 6 characters long");
      return false;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setLocalError("Passwords don't match!");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      setLocalError("");

      if (!validatePasswords()) {
        return;
      }

      const storedEmail = localStorage.getItem("recoveryEmail");
      const userEmail = email || storedEmail;

      if (!userEmail) {
        setLocalError(
          "Email not found. Please try the password reset process again."
        );
        return;
      }

      if (!verifiedOtp) {
        setLocalError(
          "OTP verification required. Please verify your OTP first."
        );
        return;
      }

      console.log("Submitting password update with:", {
        email: userEmail,
        newPassword: passwords.newPassword,
      });

      await dispatch(
        changePassword({
          email: userEmail,
          newPassword: passwords.newPassword,
        })
      );

      navigate("/");
    } catch (err) {
      console.error("Password update error:", err);
      setLocalError(
        err.message || "Failed to update password. Please try again."
      );
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
      <div className="image-section1">
        <img src="/fpass.svg" alt="logo" className="logo" />
        <a href="#" onClick={() => navigate("/home")}>
            <img src="back.svg" className="cn-home" />
          </a>
      </div>
      <div id="container4">
        <h1 id="change">Change Password</h1>
        {(error || localError) && (
          <div
            className="error-message"
            style={{
              color: "red",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            {error || localError}
          </div>
        )}

        <div className="label">New Password:</div>
        <div className="relative">
          <input
            className="cpass"
            placeholder="Enter password"
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            disabled={isLoading}
          />
          <img
            src={showNewPassword ? "/eye-open.svg" : "/eye-cross.svg"}
            alt={showNewPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-[4%] transform -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity cpeye"
            onClick={toggleNewPasswordVisibility}
          />
        </div>

        <div className="label">Confirm Password:</div>
        <div className="relative">
          <input
            className="cpass"
            placeholder="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
          />
          <img
            src={showConfirmPassword ? "/eye-open.svg" : "/eye-cross.svg"}
            alt={showConfirmPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-[4%] transform -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity cpeye"
            onClick={toggleConfirmPasswordVisibility}
          />
        </div>

        <button
          id="cont"
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Updating..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Changepass;
