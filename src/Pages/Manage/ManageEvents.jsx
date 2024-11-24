import React from "react";
import NavHost from "../Host/NavHost";

const Event_Manage = () => {
  const metrics = [
    {
      label: "Total Events",
      value: "0",
      bgColor: "bg-[#B72A7E]",
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
      <div className="w-6 h-6 flex">
        {label === "Total Events" && <img src="GG.svg" alt="Events" />}
        {label === "Total Impressions" && (
          <img src="star.svg" alt="Impressions" />
        )}
        {label === "Total Registrations" && (
          <img src="notes.svg" alt="Registrations" />
        )}
      </div>
      <div className="flex gap-[10px]">
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );

  const EventCard = ({ title, college, tag, date }) => (
    <div className="border border-[#000] rounded-lg p-4 mb-4 bg-white">
      <div className="flex items-start justify-between">
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded"></div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-[#000] font-medium">{college}</p>
            <span className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-full mt-1 font-medium">
              {tag}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className="text-sm text-[#000] font-medium">{date}</span>
          <div className="flex space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <img src="Pencil.svg" alt="Edit" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <img src="delete.svg" alt="Delete" />
            </button>
          </div>
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
            Events with ease
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
