import React from "react";
import "./Seat_Allocation.css";

const RoomOccupancy = ({ totalRooms = 20 }) => {
  const rooms = Array.from(
    { length: totalRooms },
    (_, index) => `LT-${index + 1}`
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex md:flex-row flex-col items-baseline md:items-center md:justify-between bg-[#D4E5E4] md:bg-white p-6">
        <button className="text-black font-semibold ">&larr; Back</button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Inspiron</h1>
          <p className="text-gray-500 text-sm">
            Ajay Kumar Garg Engineering College, Ghaziabad
          </p>
        </div>
      </div>

      <div className="left-part w-3 md:w-[210px]"> </div>
      <div className="left-part w-3 md:w-[210px] right-0 "> </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className=" text-base md:text-3xl text-medium md:font-semibold mb-6 text-left">
          See Room Occupancy
        </h2>
        <div className="grid grid-cols-7 gap-2 md:gap-6 justify-center">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-2 md:p-4 "
            >
              <img src="door1.svg"></img>
              <p className="mt-2 text-[11px] md:text-base font-semibold text-gray-700">
                {room}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center">
            <img src="door1.svg"></img>
            <span className="ml-2 text-gray-700">Empty Room</span>
          </div>
          <div className="flex items-center">
            <img src="black_door.svg"></img>
            <span className="ml-2 text-gray-700">Filled Room</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomOccupancy;
