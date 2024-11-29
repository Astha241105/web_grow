import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../notification/notification"; 
import "./nav-part.css";

const Navpart = ({ bgColor }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false); 

  const handleLoginClick = () => {
    navigate("/part-profile");
  };

  const handleScrollToReviews = () => {
    const reviewsSection = document.getElementById("review-box");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev); 
  };

  return (
    <div id="nav" style={{ backgroundColor: bgColor }}>
      <img id="web-logo" src="/logo.svg" alt="Website Logo" />
      <div className="home-nav-options">
        <div className="home-nav-options1">
          <div className="nav-option-text">My Event</div>
          <img src="/down-nav.svg" alt="Dropdown Icon" />
        </div>
        <div className="home-nav-options1">
          <div className="nav-option-text">Compete</div>
          <img src="/down-nav.svg" alt="Dropdown Icon" />
        </div>
        <div
          className="home-nav-options1"
          onClick={handleScrollToReviews}
        >
          Reviews
        </div>
        <img
          src="/bell.svg"
          alt="Notifications"
          onClick={handleNotificationClick}
          style={{ cursor: "pointer" }}
        />
        <div
          id="part-profile-00"
          onClick={handleLoginClick}
          className="home-nav-options1"
        >
          <img src="/profile.svg" alt="Profile" />
          <div id="part-profile1">My Profile</div>
        </div>
      </div>
      {showNotifications && <Notification />}
    </div>
  );
};

export default Navpart;
