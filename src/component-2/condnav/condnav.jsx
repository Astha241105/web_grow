import React, { useState, useEffect } from "react";
import Nav from "../navhome/nav";
import Navham from "../navham/navham";

const ResponsiveNav = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isLargeScreen ? <Nav bgColor="#fdf8ee" /> : <Navham />}
    </div>
  );
};

export default ResponsiveNav;
