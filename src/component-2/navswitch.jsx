import React, { useState, useEffect } from "react";
import ResponsiveNav2 from "../component-2/condnavpart/contnavpart"; // Import your participant navbar
import ResponsiveNav from "../component-2/condnav/condnav";  // Import your default navbar

const NavbarSwitcher = ({bgColor}) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthToken(localStorage.getItem("authToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      {authToken ? (
        <ResponsiveNav2 bgColor="#FDF8EE" />
      ) : (
        <ResponsiveNav bgColor={bgColor}/>
      )}
    </>
  );
};

export default NavbarSwitcher;
