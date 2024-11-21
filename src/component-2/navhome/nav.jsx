import React from "react";
import "./nav.css";

const Nav = () => {
  return (
    <div id="nav">
      <img id="web-logo" src="/logo.svg" alt="Website Logo" />
      <div id="home-nav-options">
        <div className="home-nav-options1">
          <img src="/down-nav.svg" alt="Dropdown Icon" />
          <div className="home-nav-options1">Compete</div>
        </div>
        <div className="home-nav-options1">
          <img src="/down-nav.svg" alt="Dropdown Icon" />
          <div className="home-nav-options1">Explore</div>
        </div>
        <div className="home-nav-options1">Reviews</div>
        <div className="home-nav-options1">
        <button className="button-home-nav" id="home-nav-login">
          Login
        </button>
        <button className="button-home-nav" id="home-nav-sign-up">
          Sign up
        </button></div>
      </div>
    </div>
  );
};

export default Nav;
