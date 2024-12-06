import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../store/slices/authSlice";
import { fetchAllUserData } from "../action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(fetchAllUserData());
      navigate("/");
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be 8-16 characters, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
      return;
    }

    const result = await dispatch(loginUser(formData));

    if (result.payload && result.payload.status === "SUCCESS") {
      const { message } = result.payload;
      toast.success("Login successful");
      if (message.includes("USER")) {
        dispatch(fetchAllUserData());
        navigate("/");
      } else {
        navigate("/home-host");
      }
    } else {
      const errorMessage = result.payload || "An unexpected error occurred.";
    toast.error(errorMessage);
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
      <ToastContainer 
       position="top-center"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="dark"/>
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
