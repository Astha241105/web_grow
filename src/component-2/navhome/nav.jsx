import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./nav.css";

const Nav = ({ bgColor }) => {
  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is active
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 }); // Position of dropdown
  const navigate = useNavigate();

  const handleScrollToReviews = () => {
    const reviewsSection = document.getElementById("review-box");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/areu");
  };

  const toggleDropdown = (type, event) => {
    if (activeDropdown === type) {
      setActiveDropdown(null); // Close if already open
    } else {
      const rect = event.currentTarget.getBoundingClientRect(); // Get the position of the clicked element
      setDropdownPosition({ top: rect.bottom, left: rect.left }); // Set dropdown position
      setActiveDropdown(type); // Open the new dropdown
    }
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
          onClick={(e) => toggleDropdown("compete", e)} // Pass event to get position
        >
          <div className="nav-option-text">Compete</div>
          <img src="/down-nav.svg" alt="Dropdown Icon" />
        </div>
        <div
          className="home-nav-options1"
          onClick={(e) => toggleDropdown("explore", e)} // Pass event to get position
        >
          <div className="nav-option-text">Explore</div>
          <img src="/down-nav.svg" alt="Dropdown Icon" />
        </div>
        <div
          className="home-nav-options1"
          onClick={handleScrollToReviews}
        >
          Reviews
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

      {/* Dropdown Menus */}
      {activeDropdown === "compete" && (
        <div
          className="dropdown-menu"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }} // Position dynamically
        >
          <img
            src="/cross2.svg"
            alt="Close"
            className="dropdown-close-icon"
            onClick={closeDropdown}
          />
          <ul>
            <li onClick={() => navigate("/quiz")}>Quiz</li>
            <li onClick={() => navigate("/hackathon")}>Hackathon</li>
            <li onClick={() => navigate("/contest")}>Contest</li>
          </ul>
        </div>
      )}

      {activeDropdown === "explore" && (
        <div
          className="dropdown-menu"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }} // Position dynamically
        >
          <img
            src="/cross2.svg"
            alt="Close"
            className="dropdown-close-icon"
            onClick={closeDropdown}
          />
          <ul>
            <li onClick={() => navigate("/events")}>Events</li>
            <li onClick={() => navigate("/webinars")}>Webinars</li>
            <li onClick={() => navigate("/seminars")}>Seminars</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
