import React, { useState } from "react";
import NavHost from "../Host/NavHost";

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState("connections");
  const [searchQuery, setSearchQuery] = useState("");

  const existingConnections = [
    {
      id: 1,
      name: "Ansh Gupta",
      role: "Assistant Professor",
      institution: "IIT Delhi",
      status: "connected",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      role: "Associate Professor",
      institution: "IIT Delhi",
      status: "connected",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Research Scholar",
      institution: "IIT Delhi",
      status: "connected",
    },
  ];

  const connections = [
    {
      id: 1,
      name: "Ansh Gupta",
      role: "Assistant Professor",
      institution: "IIT Delhi",
      status: "pending",
    },
    {
      id: 2,
      name: "Ansh Gupta",
      role: "Assistant Professor",
      institution: "IIT Delhi",
      status: "pending",
    },
    {
      id: 3,
      name: "Ansh Gupta",
      role: "Assistant Professor",
      institution: "IIT Delhi",
      status: "pending",
    },
  ];

  const connectionRequests = [
    {
      id: 1,
      name: "Ansh Gupta",
      role: "Assistant Professor",
      institution: "IIT Delhi",
      status: "waiting",
    },
    {
      id: 2,
      name: "Ansh Gupta",
      role: "Assistant Professor",
      institution: "IIT Delhi",
      status: "waiting",
    },
  ];

  const ConnectionCard = ({ name, role, institution, status }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#000] mb-3">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-[#000]">{role}</p>
          <p className="text-sm text-[#000]">{institution}</p>
        </div>
      </div>
      {status !== "connected" && (
        <button className="px-4 py-1 rounded-full text-sm border border-[#008080] text-[#008080]">
          {status === "pending" ? "Request" : "Approve"}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <NavHost />
      <hr className="absolute w-[153%] left-0 top-[60px] border-b border-black border-[0px]" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mt-10">
            <span className="text-[#008080] font-semibold">Connect</span> and
            Work{" "}
            <span className="text-[#008080] font-semibold">
              Collaboratively
            </span>{" "}
            with
          </h1>
          <h2 className="text-3xl font-semibold">other hosts</h2>
        </div>

        <div className="relative mb-8">
          <div className="relative">
            <img
              src="search-icon.svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              alt="Search Icon"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-1/3 px-4 py-2 pl-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-[#008080]"
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              <button
                className={`pb-2 px-1 ${
                  activeTab === "connections"
                    ? "border-b-2 border-[#008080] font-semibold text-[#008080]"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("connections")}
              >
                Your Connections
              </button>
              <button
                className={`pb-2 px-1 ${
                  activeTab === "connect"
                    ? "border-b-2 border-[#008080] font-semibold text-[#008080]"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("connect")}
              >
                Connect with others
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {activeTab === "connect" && (
              <>
                {connections.map((connection) => (
                  <ConnectionCard key={connection.id} {...connection} />
                ))}
              </>
            )}
            {activeTab === "connections" && (
              <>
                {existingConnections.map((connection) => (
                  <ConnectionCard key={connection.id} {...connection} />
                ))}
              </>
            )}
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg border border-[#000]">
              <h3 className="text-lg font-semibold mb-4 text-[#008080]">
                Connection Requests
              </h3>
              {connectionRequests.map((request) => (
                <ConnectionCard key={request.id} {...request} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamManagement;
