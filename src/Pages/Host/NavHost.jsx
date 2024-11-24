import React from "react";

const NavHost = ({ className = "" }) => {
  return (
    <header className="w-full">
      <div className={`max-w-6xl mx-auto px-4 py-4`}>
        <div className="flex justify-between items-center">
          <img src="Web.svg" alt="Web logo" />
          <nav className="flex items-center space-x-4">
            <a href="#" className="text-[#008080] font-semibold flex">
              My Events
              <img src="down_arrow.svg" alt="down arrow" />
            </a>
            <a href="#" className="text-[#008080] font-semibold flex">
              Manage
              <img src="down_arrow.svg" alt="down arrow" />
            </a>
            <a>
              <img src="Notify.svg" alt="notifications" />
            </a>
            <a className="text-[#008080] font-semibold flex items-center">
              <img src="Prof.svg" className="w-7 h-7 mr-2" alt="profile" />
              My Profile
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavHost;
