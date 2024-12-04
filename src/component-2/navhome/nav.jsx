import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./nav.css";
import Loginpopup from "../login-popup/login-popup";

const Nav = ({ bgColor }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/areu");
  };

  const toggleDropdown = (type, event) => {
    if (activeDropdown === type) {
      setActiveDropdown(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom, left: rect.left });
      setActiveDropdown(type);
    }
  };

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleCreateEventsClick = () => {
    setShowLoginPopup(true);
  };

  const handleRegisteredEventsClick = () => {
    setShowLoginPopup(true);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false); 
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <div id="nav" style={{ backgroundColor: bgColor }}>
      <img id="web-logo" src="/logo.svg" alt="Website Logo" />
      <div id="home-nav-options">
        <div
          className="home-nav-options1"
          onClick={(e) => toggleDropdown("compete", e)}
        >
          <div className="nav-option-text">Compete</div>
          <img src="/down-nav.svg" alt="Dropdown Icon" />
        </div>
        <div
          className="home-nav-options1"
          onClick={(e) => toggleDropdown("explore", e)}
        >
          <div className="nav-option-text">Explore</div>
          <img src="/down-nav.svg" alt="Dropdown Icon" />
        </div>
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

      {activeDropdown === "compete" && (
        <div
          className="dropdown-menu"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
        >
          <img
            src="/cross2.svg"
            alt="Close"
            className="dropdown-close-icon"
            onClick={closeDropdown}
          />
          <ul>
            <li onClick={() => navigate("/event-type", { state: { category: "quiz" } })}>Quiz</li>
            <li onClick={() => navigate("/event-type", { state: { category: "hackathon" } })}>Hackathon</li>
            <li onClick={() => navigate("/event-type", { state: { category: "seminar" } })}>Seminar</li>
            <li onClick={() => navigate("/event-type", { state: { category: "webinar" } })}>Webinar</li>
          </ul>
        </div>
      )}

      {activeDropdown === "explore" && (
        <div
          className="dropdown-menu"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
        >
          <img
            src="/cross2.svg"
            alt="Close"
            className="dropdown-close-icon"
            onClick={closeDropdown}
          />
          <ul>
            <li onClick={handleCreateEventsClick}>Create Events</li>
            <li onClick={handleRegisteredEventsClick}>Registered Events</li>
          </ul>
        </div>
      )}

      {showLoginPopup && <Loginpopup onClose={handleCloseLoginPopup} />}
    </div>
  );
};

export default Nav;