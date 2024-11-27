import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./nav-part.css";

const Navpart = ({ bgColor}) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {

    navigate("/part-profile");
  };


  return (
    <div id="nav" style={{ backgroundColor: bgColor}}>
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
        <div className="home-nav-options1">Reviews</div>
        <img src="/bell.svg"></img>
        <div id="part-profile-00" 
         onClick={handleLoginClick} 
         className="home-nav-options1">
            <img src="/profile.svg"></img>
            <div  id="part-profile1">My Profile</div>
        </div>
      </div>
    </div>
  );
};

export default Navpart;
