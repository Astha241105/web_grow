import React from "react";
import NavHost from "../Host/NavHost";
// import { PencilIcon, Trash2Icon } from "lucide-react";

const Event_Manage = () => {
  const metrics = [
    {
      label: "Total Events",
      value: "0",
      bgColor: "bg-[#E91E63]",
      textColor: "text-white",
    },
    {
      label: "Total Impressions",
      value: "0",
      bgColor: "bg-[#26A69A]",
      textColor: "text-white",
    },
    {
      label: "Total Registrations",
      value: "0",
      bgColor: "bg-[#7E57C2]",
      textColor: "text-white",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Inspiron",
      college: "Ajay Kumar Garg Engineering College",
      tag: "Coding Challenge",
      date: "1 September, 2024",
    },
    {
      id: 2,
      title: "Inspiron",
      college: "Ajay Kumar Garg Engineering College",
      tag: "Coding Challenge",
      date: "1 September, 2024",
    },
  ];

  const MetricCard = ({ label, value, bgColor, textColor }) => (
    <div
      className={`${bgColor} ${textColor} rounded-lg px-4 py-2 flex items-center space-x-2`}
    >
      <div className="w-6 h-6">
        {label === "Total Events" && (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm4-8h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2z" />
          </svg>
        )}
        {label === "Total Impressions" && (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
        )}
        {label === "Total Registrations" && (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        )}
      </div>
      <div>
        <div className="text-lg font-semibold">{value}</div>
        <div className="text-sm">{label}</div>
      </div>
    </div>
  );

  const EventCard = ({ title, college, tag, date }) => (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
      <div className="flex items-start justify-between">
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded"></div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{college}</p>
            <span className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-full mt-1">
              {tag}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{date}</span>
          <button className="p-1 hover:bg-gray-100 rounded">
            {/* <PencilIcon className="w-5 h-5 text-gray-600" /> */}
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            {/* <Trash2Icon className="w-5 h-5 text-gray-600" /> */}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF]">
      <NavHost />
      <hr className="absolute w-[153%] left-0 top-[60px] border-b border-black border-[0px]" />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mt-8">
            <span className="text-[#008080] font-semibold">Manage</span> Your{" "}
            <span className="text-[#008080] font-semibold">Offline</span> Events
            with ease
          </h1>
        </div>

        <div className="flex space-x-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Event_Manage;
