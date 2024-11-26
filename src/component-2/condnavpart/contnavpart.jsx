import React, { useState, useEffect } from "react";
import Navpart from "../nav-participant/navpart";
import Partnavham from "../part-navham/partnavham";


const ResponsiveNav2 = () => {
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
      {isLargeScreen ? <Navpart bgColor="#fdf8ee" /> : <Partnavham  />}
    </div>
  );
};

export default ResponsiveNav2;