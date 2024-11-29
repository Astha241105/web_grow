import React, { useState } from "react";
// import { ChevronDownIcon } from "@heroicons/react/solid";

const GeneralKnowledge = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">General Knowledge</h2>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            isDropdownOpen
              ? "bg-gray-200 hover:bg-gray-300"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={toggleDropdown}
        >
          {isDropdownOpen ? "Close" : "Open"}
        </button>
      </div>
      {isDropdownOpen && (
        <div className="mt-4">
          <p>This is where the dropdown content would be displayed.</p>
        </div>
      )}
      <div className="mt-4">
        <p>Registration deadline: 25 Nov 24, 11:00 PM IST</p>
        <a
          href="#"
          className="mt-4 inline-block bg-green-500 hover:bg-green-600
          text-white font-bold py-2 px-4 rounded"
        >
          {" "}
          Register
        </a>
      </div>
    </div>
  );
};

const Stages = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold">Stages and Timeline</h2>
      <p className="mt-4">
        On WebGrow. You'll be given an assignment. You will also get a "hint"
        button to see the correct answer.
      </p>
    </div>
  );
};

const Deadlines = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold">Deadlines</h2>
      <p className="mt-4">Registration deadline: 25 Nov 24, 11:00 PM IST</p>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold">Contact the organiser</h2>
      <p className="mt-4">Anshika Gupta, cse@acm.org, +91 9999999999</p>
    </div>
  );
};

const Rewards = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold">Rewards</h2>
      <div className="mt-4">
        <div>
          <span className="font-bold">Winner:</span>
          <input
            type="text"
            className="border-gray-300 rounded-md px-2 py-1 ml-2"
            placeholder="Add Description"
          />
        </div>
        <div className="mt-2">
          <span className="font-bold">First Runner-up:</span>
          <input
            type="text"
            className="border-gray-300 rounded-md px-2 py-1 ml-2"
            placeholder="Add Description"
          />
        </div>
        <div className="mt-2">
          <span className="font-bold">Second Runner-up:</span>
          <input
            type="text"
            className="border-gray-300 rounded-md px-2 py-1 ml-2"
            placeholder="Add Description"
          />
        </div>
      </div>
    </div>
  );
};

const details = () => {
  return (
    <div className="container mx-auto py-8">
      <GeneralKnowledge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Stages />
        <Deadlines />
        <Contact />
        <Rewards />
      </div>
    </div>
  );
};

export default details;
