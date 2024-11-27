import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./login-popup.css"; 

const Loginpopup = ({ onClose }) => {
  const navigate = useNavigate(); 

  const handleClose = () => {
    if (onClose) {
      onClose(); 
    }
  };

  const handleLoginClick = () => {  
    navigate("/login"); 
  };

  const handleSignUpClick = () => {
    navigate("/areu"); 
  };

  return (
    <div id="login-popup">
      <img
        src="/cross.svg"
        id="close-login-popup"
        alt="Close"
        onClick={handleClose}
      />
      <div className="login-request">Log in to continue your journey!</div>

      <button
        id="login-popup-button"
        onClick={handleLoginClick} 
      >
        Log In
      </button>
      <div className="login-request">
        <div id="login-request-register-1">Don't have an account?</div>
        <div
          id="login-request-register-2"
          onClick={handleSignUpClick} 
        >
          Sign UP
        </div>
      </div>
    </div>
  );
};

export default Loginpopup;
