import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Loginpopup from "../login-popup/login-popup";
import { setSelectedCategory } from '../../browse-by-category/selected';  
import "./navham.css";

const Navham = ({bgColor}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path); 
    setIsMenuOpen(false); 
  };

  const handleScrollToReviews = () => {
    const reviewsSection = document.getElementById("review-box");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" }); 
    }
    setIsMenuOpen(false); 
  };

  const openPopup = () => {
    setShowPopup(true);
    setIsMenuOpen(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

    const navigate1 = useNavigate();
  
    const handleViewMore = (category) => {
      setSelectedCategory(category); 
      navigate1('/event-type', { state: { category: category } });
    };
  
  return (
    <div id="nav-bar-with-hamburger" style={{ background: bgColor }}>
      <div id="nav-bar-with-hamburger-icon">
        <div className="hamburger" onClick={toggleMenu}>
          <img id="nav-ham-icon" src="/hambuger.svg" />
        </div>
        <img src="/logo.svg" alt="Logo" className="nav-logo-ham" />
      </div>
      {isMenuOpen && (
        <ul className="menu2">
          <li className="close-menu" onClick={toggleMenu}>
            <img src="/cross2.svg" alt="Close Menu" className="menu-close-icon" />
          </li>
          <li
            className="nav-ham-options-list"
            onClick={() => handleNavigation("/login")}
          >
            Login
          </li>
          <li
            className="nav-ham-options-list"
            onClick={() => handleNavigation("/areu")} 
          >
            Sign Up
          </li>
          <li className="nav-ham-options-list" onClick={openPopup}>
            Registered Events
          </li>
          <li className="nav-ham-options-list" onClick={openPopup}>
            Create Events
          </li>
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
        </ul>
      )}

      {showPopup && (
        <div className="popup-overlay-99">
          <Loginpopup onClose={closePopup} /> 
        </div>
      )}
    </div>
  );
};

export default Navham;
