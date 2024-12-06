import React from "react";
import { useSelector } from "react-redux";

const EventCard = () => {
  const { event, loading } = useSelector((state) => state.event_details);

  if (loading) return null;

  return (
    <div className="bg-teal-600 text-white rounded-lg shadow-md overflow-hidden p-4 w-full md:w-[70%]">
      <div className="flex items-start justify-between gap-2 md:gap-24">
        <div>
          <h2 className="text-xl font-semibold">
            {event?.title || "Event Title"}
          </h2>
          <div className="flex items-center text-sm mt-2">
            <img className="mr-2" src="College1.svg" alt="College icon"></img>
            <span className="text-sm mt-1">
              {event?.location || "Location"}
            </span>
          </div>
          <div className="flex items-center text-sm mt-2">
            <img className="mr-2" src="Offline1.svg" alt="Mode icon"></img>
            <span>{event?.mode || "Mode"}</span>
          </div>
          <div className="flex items-center text-sm mt-2">
            <img className="mr-2" src="calendar.svg" alt="Calendar icon"></img>
            <span className="font-semibold">
              Updated on:{" "}
              <span>
                {event?.lastUpdate
                  ? new Date(event.lastUpdate).toLocaleDateString()
                  : "N/A"}
              </span>
            </span>
          </div>
          <div className="mt-6">
            <span className="bg-teal-600 text-white rounded-[10px] p-2 border-white border text-base font-semibold">
              {event?.category || "Event Category"}
            </span>
          </div>
        </div>
        <div className=" h-36 w-40">
          <img
            src={event?.imageUrl || "https://via.placeholder.com/100x60"}
            alt="Event Logo"
            className=" w-40 h-36 object-contain"
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
