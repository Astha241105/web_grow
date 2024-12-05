import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../navhome/nav";
import Navham from "../navham/navham";

const ResponsiveNav = ({ bgColor }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1000);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 560);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1000);
      setIsSmallScreen(window.innerWidth <= 560);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine the background color for Navham
  const navhamBgColor =
    isSmallScreen && location.pathname === "/" ? "#ffffff" : bgColor;

  return (
    <div>
      {isLargeScreen ? <Nav bgColor={bgColor} /> : <Navham bgColor={navhamBgColor} />}
    </div>
  );
};

export default ResponsiveNav;
