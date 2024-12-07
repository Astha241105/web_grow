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

  const { eventId, eventData } = location.state || {};

  const {
    hosts,
    loading: hostsLoading,
    error: hostsError,
  } = useSelector((state) => state.hosts);
  const { error: collaboratorError } = useSelector(
    (state) => state.addCollaborator
  );

  const [loadingHostId, setLoadingHostId] = useState(null);
  const [localHosts, setLocalHosts] = useState([]);
  const [collaborators, setCollaborators] = useState([
    {
      id: 1,
      name: "Ansh Gupta",
      role: "Assistant Professor",
      institution: "IIT Delhi",
      status: "connected",
    },
  ]);

  // Initialize local hosts when hosts are fetched
  useEffect(() => {
    dispatch(fetchHosts());
  }, [dispatch]);

  useEffect(() => {
    if (hosts.length > 0) {
      setLocalHosts(hosts);
    }
  }, [hosts]);

  const handleAddCollaborator = (hostId) => {
    if (eventId && hostId) {
      // Set loading state for this specific host
      setLoadingHostId(hostId);

      dispatch(addHostAsCollaborator({ eventId, hostId }))
        .then((response) => {
          if (
            response.type === "collaborators/addHostAsCollaborator/fulfilled"
          ) {
            const hostToAdd = localHosts.find(
              (host) => String(host.id) === String(hostId)
            );

            if (hostToAdd) {
              // Add to collaborators
              setCollaborators((prev) => [
                ...prev,
                { ...hostToAdd, status: "connected" },
              ]);

              // Remove from local hosts
              setLocalHosts((prev) =>
                prev.filter((host) => String(host.id) !== String(hostId))
              );
            }
          }
        })
        .catch((error) => {
          console.error("Add collaborator error:", error);
        })
        .finally(() => {
          // Remove loading state
          setLoadingHostId(null);
        });
    }
  };

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
    return localHosts.filter(
      (host) =>
        host.name.toLowerCase().includes(searchLower) ||
        host.role.toLowerCase().includes(searchLower) ||
        host.institution.toLowerCase().includes(searchLower)
    );
  }, [localHosts, searchQuery]);

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
      <button
        onClick={() => handleAddCollaborator(id)}
        disabled={loadingHostId === id}
        className="px-4 py-1 rounded-full text-sm border border-[#008080] text-[#008080] disabled:opacity-50"
      >
        {loadingHostId === id ? "Adding..." : "Add Collaborator"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <NavHost />
      <hr className="absolute w-[153%] left-0 top-[60px] border-b border-black border-[0px]" />

      <main className="max-w-6xl mx-auto px-4 py-8">
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
