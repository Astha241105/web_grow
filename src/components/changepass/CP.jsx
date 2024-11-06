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
    <div id="contout3">
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
        <input
          className="cpass"
          placeholder="Enter password"
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          disabled={isLoading}
        />

        <div className="label">Confirm Password:</div>
        <input
          className="cpass"
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
        />

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
