import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navpart from "../nav-participant/navpart";
import Partnavham from "../part-navham/partnavham";

const ResponsiveNav2 = ({ bgColor }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1000);
  const [backgroundColor, setBackgroundColor] = useState(bgColor);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1000);


      if (location.pathname === "/" && window.innerWidth > 560) {
        setBackgroundColor("#FDF8EE");
      } else {
        setBackgroundColor(bgColor);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [bgColor, location.pathname]);

  return (
    <div>
      {isLargeScreen ? <Navpart bgColor={backgroundColor} /> : <Partnavham bgColor={backgroundColor} />}
    </div>
  );
};

export default ResponsiveNav2;
