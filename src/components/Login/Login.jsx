import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../store/slices/authSlice";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/Home");
    }
    dispatch(clearError());
  }, [token, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (!result.error) {
      localStorage.setItem("token", result.payload.token);
      navigate("/home");
    }
  };

  const handleforgot = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  const createaccount = (e) => {
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
          <img src="/cross.svg" alt="cross" className="cross hidden md:block" />
          <h3 className="heading w-[300px] md:w-[392px]">Welcome Back!</h3>
          {error && <div className="error-message">{error}</div>}
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
              />
              <img
                src={showPassword ? "/eye-open.svg" : "/eye-cross.svg"}
                alt={showPassword ? "Hide password" : "Show password"}
                className="absolute bottom-[20%] right-[4%] cursor-pointer hover:opacity-70 transition-opacity"
                onClick={togglePasswordVisibility}
              />
            </div>

            <div className="forgot-password">
              <a href="#" onClick={handleforgot}>
                Forgot Password?
              </a>
            </div>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="signup-link">
              Don't have an account?{" "}
              <a href="#" onClick={createaccount} className="create-account">
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
