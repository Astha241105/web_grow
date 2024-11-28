import React from "react";
import NavHost from "../Host/NavHost";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const HostProfile = () => {
  const data = [
    { name: "Day 1", value: 50 },
    { name: "Day 2", value: 100 },
    { name: "Day 3", value: 150 },
    { name: "Day 4", value: 200 },
    { name: "Day 5", value: 250 },
    { name: "Day 6", value: 300 },
    { name: "Day 7", value: 350 },
  ];

  return (
    <div>
      <NavHost cameFromProfile={true} />
      <div className="profileSection border border-x-[75px] border-[#D4E5E4]">
        <div>
          <div className="m-4 text-xl text-[#008080] font-semibold">
            My Profile
          </div>
          <div className="flex items-center py-9 px-9  border-y-2 mx-4">
            <div className=" w-28 h-28 rounded-full bg-gray-300 mr-6"></div>
            <div>
              <h2 className="text-lg font-semibold">Anshika Gupta</h2>
              <p className="text-gray-600">a@gmail.com</p>
              <p className="text-gray-600">
                Ajay Kumar Garg Engineering College
              </p>
              <div className="flex  px-4 py-2 rounded-md mt-4">
                <img src="pen_edit.svg" alt="Edit Icon" className="mr-2" />
                <span className="text-[#00F] text-base font-semibold mt-1">
                  Edit Profile
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-8 mt-8">
            <div className="flex gap-2 mb-2">
              <img src="analytics.svg" alt="Analytics Icon" className="mr-2" />
              <span className=" text-base font-medium mt-1">Analytics</span>
            </div>
            <div className="flex gap-2">
              <img src="logout_1.svg" alt="Analytics Icon" className="mr-2" />
              <span className=" text-base font-medium mt-1">Logout</span>
            </div>
          </div>
        </div>
        <div className="w-[2%] bg-[#D4E5E4]"></div>
      </div>
    </div>
  );
};

export default HostProfile;
