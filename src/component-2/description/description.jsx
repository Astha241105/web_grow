import React from "react";
import "./description.css";
import ib from "./eclipse-des.png";

const Des = () => {
  return (
    <div className="home-des">
      <div id="home-des-inside">
        <div id="home-des-inside-1">
          Discover Unforgettable&nbsp;
          <span className="des-span" style={{ fontWeight: 600 }}>
            Experience&nbsp;
          </span>
          At Spectacular&nbsp;
          <span className="des-span" style={{ fontWeight: 600 }}>
            Events
          </span>
        </div>
        <input id="home-search" placeholder="Search" />
      </div>
      <img id="eclipse" src={ib}></img>
      <img id="ia" src="/group2.png" alt="Event illustration" />
    </div>
  );
};

export default Des;
