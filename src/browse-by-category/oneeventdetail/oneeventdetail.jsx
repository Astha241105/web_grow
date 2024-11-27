import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./oneventdetail.css";

const Oneeventdetail = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/regifore"); 
  };

  return (
    <div id="one-event-details">
      <div id="name-of-event-1">UX Hackathon</div>
      <div id="one-event-details1">
        <div id="institute">
          <img
            className="event-name-images-1"
            src="/institute2.svg"
            alt="college"
          />
          <div className="eventname-text-1">Ajay Kumar Garg Engineering College</div>
        </div>
        <div id="type-event">
          <img
            className="event-name-images-1"
            src="Offline2.svg"
            alt="event type"
          />
          <div className="eventname-text-1">Offline</div>
        </div>
        <div id="location">
          <img
            className="event-name-images-1"
            src="/updated.svg"
            alt="location"
          />
          <div id="event-details-updated-on">Updated on :</div>
          <div className="eventname-text-1">Ghaziabad, India</div>
        </div>
      </div>
      <div id="event-skill-0">
        <div className="event-skill-1">Coding challenge</div>
        <div className="event-skill-1">Social Media and Digital</div>
      </div>
      <div
        id="register-for-the-event"
        onClick={handleRegisterClick}
        style={{ cursor: "pointer" }}
      >
        Register
      </div>
    </div>
  );
};

export default Oneeventdetail;
