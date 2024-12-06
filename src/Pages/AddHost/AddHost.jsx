import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavHost from "../Host/NavHost";
import { fetchHosts } from "../../components/store/slices/hostsSlice";

const TeamManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { hosts, loading, error } = useSelector((state) => state.hosts);
  useEffect(() => {
    dispatch(fetchHosts());
  }, [dispatch]);

  const collaborators = [
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
  const filteredCollaborators = useMemo(() => {
    const searchLower = searchQuery.toLowerCase().trim();
    return collaborators.filter(
      (collaborator) =>
        collaborator.name.toLowerCase().includes(searchLower) ||
        collaborator.role.toLowerCase().includes(searchLower) ||
        collaborator.institution.toLowerCase().includes(searchLower)
    );
  }, [collaborators, searchQuery]);

  const filteredHosts = useMemo(() => {
    const searchLower = searchQuery.toLowerCase().trim();
    return hosts.filter(
      (host) =>
        host.name.toLowerCase().includes(searchLower) ||
        host.role.toLowerCase().includes(searchLower) ||
        host.institution.toLowerCase().includes(searchLower)
    );
  }, [hosts, searchQuery]);

  const CollaboratorCard = ({ name, role, institution, status }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#000] mb-3">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-[#000]">{role}</p>
          <p className="text-sm text-[#000]">{institution}</p>
        </div>
      </div>
    </div>
  );

  const HostCard = ({ id, name, role, institution, imageUrl }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#000] mb-3">
      <div className="flex items-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
        )}
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-[#000]">{role}</p>
          <p className="text-sm text-[#000]">{institution}</p>
        </div>
      </div>
      <button className="px-4 py-1 rounded-full text-sm border border-[#008080] text-[#008080]">
        Add Collaborator
      </button>
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
              <button className="pb-2 px-1 border-b-2 border-[#008080] font-semibold text-[#008080]">
                Add Collaborators
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#008080]">Hosts</h3>
            {loading ? (
              <p>Loading hosts...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              filteredHosts.map((host) => <HostCard key={host.id} {...host} />)
            )}
          </div>
          <div>
            <div className="bg-white p-6 rounded-lg border border-[#000]">
              <h3 className="text-lg font-semibold mb-4 text-[#008080]">
                Collaborators
              </h3>
              {filteredCollaborators.map((collaborator) => (
                <CollaboratorCard key={collaborator.id} {...collaborator} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamManagement;
