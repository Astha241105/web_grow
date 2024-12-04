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

  const navigate1 = useNavigate();
  
  const handleViewMore = (category) => {
    navigate1('/event-type', { state: { category: category } });
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
          <li className="nav-ham-options-list">Registrations</li>
          <li className="nav-ham-options-list">Watchlist</li>
          <li className="nav-ham-options-list">Badges and Coins</li>
          <li className="nav-ham-options-list">Certificates</li>
          <li className="nav-ham-options-list"
          onClick={() => handleViewMore('quiz')}
          >Quiz</li>
          <li className="nav-ham-options-list"
          onClick={() => handleViewMore('seminar')}
          >Seminar</li>
          <li className="nav-ham-options-list"
          onClick={() => handleViewMore('webinar')}
          >Webinar</li>
          <li className="nav-ham-options-list"
          onClick={() => handleViewMore('hackathon')}
          >Hackathon</li>
          <li className="nav-ham-options-list">Past Events</li>
          <li className="nav-ham-options-list">Registered Events</li>
          <li className="nav-ham-options-list">Logout</li>
        </ul>
      )}
    </div>
  )
}

export default Partnavham
