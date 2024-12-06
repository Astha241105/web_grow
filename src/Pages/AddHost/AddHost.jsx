import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import NavHost from "../Host/NavHost";
import { fetchHosts } from "../../components/store/slices/hostsSlice";
import { addHostAsCollaborator } from "../../components/store/slices/addCollaboratorSlice";

const TeamManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  // Extract eventId from location state
  const { eventId, eventData } = location.state || {};

  const {
    hosts,
    loading: hostsLoading,
    error: hostsError,
  } = useSelector((state) => state.hosts);
  const { loading: collaboratorLoading, error: collaboratorError } =
    useSelector((state) => state.addCollaborator);

  useEffect(() => {
    dispatch(fetchHosts());
  }, [dispatch]);

  // Existing collaborators (you may want to replace this with actual collaborators from API)
  const [collaborators, setCollaborators] = useState([
    {
      id: 1,
      name: "Ansh Gupta",
      role: "Assistant Professor",
      institution: "IIT Delhi",
      status: "connected",
    },
    // ... other existing collaborators
  ]);

  // Handler to add host as collaborator
  const handleAddCollaborator = (hostId) => {
    if (eventId && hostId) {
      dispatch(addHostAsCollaborator({ eventId, hostId }))
        .then((response) => {
          if (
            response.type === "collaborators/addHostAsCollaborator/fulfilled"
          ) {
            // Remove host from hosts list and add to collaborators
            const hostToAdd = hosts.find(
              (host) => String(host.id) === String(hostId)
            );
            if (hostToAdd) {
              setCollaborators((prev) => [
                ...prev,
                { ...hostToAdd, status: "connected" },
              ]);
            }
          }
        })
        .catch((error) => {
          console.error("Add collaborator error:", error);
        });
    }
  };

  // Filter functions (remain the same)
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

  // Collaborator Card component (remains the same)
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

  // Host Card component
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
      <button
        onClick={() => handleAddCollaborator(id)}
        disabled={collaboratorLoading}
        className="px-4 py-1 rounded-full text-sm border border-[#008080] text-[#008080] disabled:opacity-50"
      >
        {collaboratorLoading ? "Adding..." : "Add Collaborator"}
      </button>
    </div>
  );

  // Render the component (remains the same)
  return (
    <div className="min-h-screen bg-white">
      <NavHost />
      <hr className="absolute w-[153%] left-0 top-[60px] border-b border-black border-[0px]" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Event title display */}
        {eventData && (
          <div className="mb-4 text-xl font-semibold">
            Event: {eventData.title}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#008080]">Hosts</h3>
            {hostsLoading ? (
              <p>Loading hosts...</p>
            ) : hostsError ? (
              <p>Error: {hostsError}</p>
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

        {/* Error handling for collaborator addition */}
        {collaboratorError && (
          <div className="text-red-500 mt-4">
            Error adding collaborator: {collaboratorError}
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamManagement;
