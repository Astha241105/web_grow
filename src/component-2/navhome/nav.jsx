import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./nav.css";

const Nav = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/areu"); 
  };

  return (
    <div id="nav">
      <img id="web-logo" src="/logo.svg" alt="Website Logo" />
      <div id="home-nav-options">
        <div className="home-nav-options1">
          <div className="nav-option-text">Compete</div>
          <img src="/down-nav.svg" alt="Dropdown Icon" />
        </div>
        <div className="home-nav-options1">
          <div className="nav-option-text">Explore</div>
          <img src="/down-nav.svg" alt="Dropdown Icon" />
        </div>
        <div className="home-nav-options1">Reviews</div>
        <div className="home-nav-buttons">
          <button
            className="button-home-nav"
            id="home-nav-login"
            onClick={handleLoginClick} 
          >
            Login
          </button>
          <button
            className="button-home-nav"
            id="home-nav-sign-up"
            onClick={handleSignUpClick} 
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
