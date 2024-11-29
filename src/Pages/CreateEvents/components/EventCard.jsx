import React from "react";

const EventCard = () => {
  return (
    <div className=" bg-teal-600 text-white rounded-lg shadow-md overflow-hidden p-4 w-full md:w-[70%] ">
      <div className="flex items-start justify-between gap-2 md:gap-24 ">
        <div>
          <h2 className="text-xl font-semibold">General Knowledge</h2>
          <div className="flex items-center text-sm mt-2">
            <img className="mr-2" src="College1.svg"></img>

            <span className="text-sm mt-1">
              Ajay Kumar Garg Engineering College
            </span>
          </div>
          <div className="flex items-center text-sm mt-2">
            <img className="mr-2" src="Offline1.svg"></img>
            <span>Offline</span>
          </div>
          <div className="flex items-center text-sm mt-2">
            <img className="mr-2" src="calendar.svg"></img>
            <span className="font-semibold">
              Updated on: <span> 15 Oct, 2024 </span>
            </span>
          </div>
          <div className="mt-6">
            <span className="bg-teal-600 text-white rounded-[10px] p-2 border-white border text-base font-semibold">
              Coding Challenge
            </span>
          </div>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/100x60"
            alt="Event Logo"
            className="w-20 h-12 object-contain"
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 mt-4">
        <span className="bg-white text-black px-3 py-1 text-sm font-medium rounded-md">
          Free
        </span>
        <button className="bg-black text-white px-4 font-semibold py-2 rounded-md hover:bg-gray-800">
          Register
        </button>
      </div>
    </div>
  );
};

export default EventCard;
