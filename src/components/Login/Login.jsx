import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../store/slices/authSlice";
import { fetchAllUserData } from "../action"; // Centralized function to fetch user data
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); // Remove token from Redux
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Check for token in localStorage and fetch user data
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage
    if (token) {
      dispatch(fetchAllUserData()); // Fetch all user data
      navigate("/"); // Navigate to the home page
    }
    dispatch(clearError());
  }, [dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData)); // Login action
    if (!result.error) {
      // localStorage.setItem("authToken", result.payload.token); // Store token in localStorage
      dispatch(fetchAllUserData()); // Fetch all user data
      navigate("/"); // Navigate to the home page
    }
  };

  const handleForgot = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  const createAccount = (e) => {
    e.preventDefault();
    navigate("/areu");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <img
        src="/Rectangle2.png"
        className="white-bg hidden md:block"
        alt="background"
      />

      <img src="/home.svg" alt="cross" className="cross hidden md:block" />
      <img
        src="/bgMobile.png"
        className="block md:hidden white-bgMobile"
        alt="background"
      />
      <div className="container">
        <div className="image-section">
          <img src="/side1.png" alt="logo" className="logo" />
        </div>

        <div className="form-section">
          <h3 className="heading w-[300px] md:w-[392px]">Welcome Back!</h3>
          {error && (
            <div className="error-message">
              <img src="/caution.png" alt="Error" />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Email:</label>
              <input
                className="username-input"
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group relative">
              <label className="label">Password:</label>
              <input
                className="password-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <img
                src={showPassword ? "/eye-open.svg" : "/eye-cross.svg"}
                alt={showPassword ? "Hide password" : "Show password"}
                className="absolute bottom-[20%] cursor-pointer hover:opacity-70 transition-opacity eye1"
                onClick={togglePasswordVisibility}
              />
            </div>

            <div className="forgot-password">
              <a href="#" onClick={handleForgot}>
                Forgot Password?
              </a>
            </div>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="signup-link">
              Don't have an account?{" "}
              <a href="#" onClick={createAccount} className="create-account">
                Create account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
