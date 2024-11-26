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
      <NavHost />
      <div className="container mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="rounded-full w-16 h-16"
              />
              <div>
                <h2 className="text-xl font-bold">Anshika Gupta</h2>
                <p className="text-gray-500">ag@gmail.com</p>
                <p className="text-gray-500">
                  Ajay Kumar Garg Engineering College
                </p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Edit Profile
              </button>
            </div>
            <div className="bg-white shadow-md rounded-md p-4">
              <h4 className="text-lg font-bold mb-4">General Knowledge</h4>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Coding Challenge</p>
                  <p className="text-gray-500">Created on: 29 October, 2024</p>
                </div>
                <div>
                  <p className="text-gray-500">Impressions</p>
                  <div className="bg-gray-200 rounded-full h-4 relative">
                    <div
                      className="bg-yellow-500 rounded-full h-4 absolute left-0 top-0 bottom-0"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500">Candidates Registered</p>
                  <div className="bg-gray-200 rounded-full h-4 relative">
                    <div
                      className="bg-green-500 rounded-full h-4 absolute left-0 top-0 bottom-0"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <h4 className="text-lg font-bold mb-4">Analytics</h4>
            <LineChart width={500} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
