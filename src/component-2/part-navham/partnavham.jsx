import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./partnavham.css"

const Partnavham = ({bgColor}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();

  const handleLoginClick = () => {

    navigate("/part-profile");
  };
  return (
    <div id="nav-bar-with-hamburger" style={{backgroundColor:bgColor}}>
        <div id="nav-bar-with-hamburger-icon">
      <div className="hamburger" onClick={toggleMenu}>
        <img id="nav-ham-icon" src="/hambuger.svg"  />
      </div>
      <img src="/logo.svg" alt="Logo" className="nav-logo-ham" />
      </div>
      {isMenuOpen && (
        <ul className="menu">
          <li className="close-menu" onClick={toggleMenu}>
            <img src="/cross2.svg" alt="Close Menu" className="menu-close-icon" />
          </li>
          <li className="nav-ham-options-list"
          onClick={handleLoginClick} >My Profile</li>
          <li className="nav-ham-options-list">Notification</li>
          <li className="nav-ham-options-list">Reviews</li>
          <li className="nav-ham-options-list">Quiz</li>
          <li className="nav-ham-options-list">Seminar</li>
          <li className="nav-ham-options-list">Webinar</li>
          <li className="nav-ham-options-list">Hackathon</li>
          <li className="nav-ham-options-list">Past Events</li>
          <li className="nav-ham-options-list">Registered Events</li>
        </ul>
      )}
    </div>
  )
}

export default Partnavham
