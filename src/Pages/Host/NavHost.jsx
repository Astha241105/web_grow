import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavHost = ({ className = "", cameFromProfile = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMyEventsDropdownOpen, setIsMyEventsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMyEventsDropdown = () => {
    setIsMyEventsDropdownOpen(!isMyEventsDropdownOpen);
  };

  const handleCreateEvent = () => {
    navigate("/Create-Events");
  };

  const handleManageEvent = () => {
    navigate("/event-manage");
  };

  return (
    <header
      className={`w-full relative ${
        cameFromProfile ? "bg-[#D4E5E4]  border-b-[1px] border-black" : ""
      } ${className}`}
    >
      <div className={`max-w-6xl mx-auto px-4 py-4`}>
        <div className="flex justify-between items-center">
          <img src="Icon.svg" alt="Web logo" />

          <nav className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="text-[#008080] font-semibold flex items-center"
              onClick={toggleMyEventsDropdown}
            >
              My Events
              <img src="down_arrow.svg" alt="down arrow" className="ml-1" />
            </a>
            {isMyEventsDropdownOpen && (
              <div className="absolute bg-white shadow-lg p-4 mt-2 w-40">
                <a
                  href="#"
                  className="text-[#008080] block font-semibold hover:bg-gray-100 px-2 py-1"
                  onClick={handleCreateEvent}
                >
                  Create Event
                </a>
                <a
                  href="#"
                  className="text-[#008080] block font-semibold hover:bg-gray-100 px-2 py-1"
                  onClick={handleManageEvent}
                >
                  Manage Events
                </a>
              </div>
            )}
            <a href="#" className="flex items-center">
              <img src="Notify.svg" alt="notifications" />
            </a>
            <a
              href="#"
              className="text-[#008080] font-semibold flex items-center"
            >
              <img src="Prof.svg" className="w-7 h-7 mr-2" alt="profile" />
              My Profile
            </a>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6 text-[#008080]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-[#008080]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50">
            <nav className="flex flex-col p-4 space-y-4">
              <a
                href="#"
                className="text-[#008080] font-semibold flex items-center"
                onClick={toggleMyEventsDropdown}
              >
                <span className="flex-grow">My Events</span>
                <img src="down_arrow.svg" alt="down arrow" className="ml-1" />
              </a>
              {isMyEventsDropdownOpen && (
                <div className="absolute bg-white shadow-lg p-4 mt-2 w-40">
                  <a
                    href="#"
                    className="text-[#008080] block font-semibold hover:bg-gray-100 px-2 py-1"
                    onClick={handleCreateEvent}
                  >
                    Create Event
                  </a>
                  <a
                    href="#"
                    className="text-[#008080] block font-semibold hover:bg-gray-100 px-2 py-1"
                    onClick={handleManageEvent}
                  >
                    Manage Events
                  </a>
                </div>
              )}
              <a
                href="#"
                className="text-[#008080] font-semibold flex items-center"
              >
                <span className="flex-grow">Manage</span>
                <img src="down_arrow.svg" alt="down arrow" className="ml-1" />
              </a>
              <a href="#" className="flex items-center">
                <span className="flex-grow">Notifications</span>
                <img src="Notify.svg" alt="notifications" />
              </a>
              <a
                href="#"
                className="text-[#008080] font-semibold flex items-center"
              >
                <img src="Prof.svg" className="w-7 h-7 mr-2" alt="profile" />
                <span>My Profile</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavHost;
