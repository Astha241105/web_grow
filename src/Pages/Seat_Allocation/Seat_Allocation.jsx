import React from "react";

const Room_allocate = () => {
  const RoomOccupancyCell = ({ status, roomLabel }) => {
    const cellStyles = `
      w-12 h-12 flex items-center justify-center
      rounded-md text-white text-sm font-medium
      ${status === "empty" ? "bg-gray-300" : "bg-blue-500"}
    `;

    return <div className={cellStyles}>{roomLabel}</div>;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40x40"
              alt="Inspiron logo"
              className="w-10 h-10"
            />
            <span className="text-gray-500">Inspiron</span>
            <span className="text-gray-500">
              Ajay Kumar Garg Engineering College, Ghaziabad
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
              Inspect
            </button>
            <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md">
              Plugins
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Share
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">See Room Occupancy</h2>
          <div className="grid grid-cols-7 gap-4">
            {["LT-8", "LT-9", "LT-10", "LT-11", "LT-12", "LT-13", "LT-14"].map(
              (room, index) => (
                <RoomOccupancyCell
                  key={index}
                  status={index % 2 === 0 ? "empty" : "filled"}
                  roomLabel={room}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room_allocate;
