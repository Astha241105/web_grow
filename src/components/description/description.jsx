import React from 'react';
import "../description/description.css";
import ia from "../description/i.png";

const Des = () => {
  return (
    <div id="home-des">
      <div id="home-des-inside">
        <div id="home-des-inside-1">
          Discover Unforgettable&nbsp;
          <span className="des-span" style={{ fontWeight: 600 }}>Experience</span>
          At Spectacular 
          <span className="des-span" style={{ fontWeight: 600 }}>&nbsp;Events</span>
        </div>
        <input id="home-search" placeholder="Search" />
      </div>
      <img id="ia" src={ia} alt="Event illustration" />
    </div>
  );
};

export default Des;
