import React, { useState } from "react";
import "./navham.css";

const Navham = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav id="nav-bar-with-hamburger">
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
          <li className="nav-ham-options-list">Login</li>
          <li className="nav-ham-options-list">Sign Up</li>
          <li className="nav-ham-options-list">Reviews</li>
          <li className="nav-ham-options-list">Registered Events</li>
          <li className="nav-ham-options-list">Create Events</li>
          <li className="nav-ham-options-list">Quiz</li>
          <li className="nav-ham-options-list">Seminar</li>
          <li className="nav-ham-options-list">Webinar</li>
          <li className="nav-ham-options-list">Hackathon</li>
        </ul>
      )}
    </nav>
  );
};

export default Navham;
