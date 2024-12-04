import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../notification/notification"; 
import "./nav-part.css";

const Navpart = ({ bgColor }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false); 
  const [showCompeteMenu, setShowCompeteMenu] = useState(false);
  const [showMyEventMenu, setShowMyEventMenu] = useState(false);

  const handleLoginClick = () => {
    navigate("/part-profile");
  };

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev); 
  };

  const toggleCompeteMenu = () => {
    setShowCompeteMenu((prev) => !prev);
    setShowMyEventMenu(false); 
  };

  const toggleMyEventMenu = () => {
    setShowMyEventMenu((prev) => !prev);
    setShowCompeteMenu(false); 
  };

  return (
    <div id="nav" style={{ backgroundColor: bgColor }}>
      <img id="web-logo" src="/logo.svg" alt="Website Logo" />
      <div className="home-nav-options">
        <div className="home-nav-options1" onClick={toggleMyEventMenu}>
          <div className="nav-option-text">My Event</div>
          <img src="/down-nav.svg" alt="Dropdown Icon" />
          {showMyEventMenu && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => navigate("/registered-events")}>
                Registered Events
              </div>
              <div className="dropdown-item" onClick={() => navigate("/past-events")}>
                Past Events
              </div>
            </div>
          )}
        </div>

        <div className="home-nav-options1" onClick={toggleCompeteMenu}>
  <div className="nav-option-text">Compete</div>
  <img src="/down-nav.svg" alt="Dropdown Icon" />
  {showCompeteMenu && (
    <div className="dropdown-menu">
      <div
        className="dropdown-item"
        onClick={() => navigate("/event-type", { state: { category: "quiz" } })}
      >
        Quiz
      </div>
      <div
        className="dropdown-item"
        onClick={() => navigate("/event-type", { state: { category: "hackathon" } })}
      >
        Hackathon
      </div>
      <div
        className="dropdown-item"
        onClick={() => navigate("/event-type", { state: { category: "seminar" } })}
      >
        Seminar
      </div>
      <div
        className="dropdown-item"
        onClick={() => navigate("/event-type", { state: { category: "webinar" } })}
      >
        Webinar
      </div>
    </div>
  )}
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
