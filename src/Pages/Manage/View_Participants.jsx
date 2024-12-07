import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavHost from "../Host/NavHost";
import { fetchParticipants } from "../../components/store/slices/ParticipantList";

const View_participants = () => {
  const dispatch = useDispatch();
  const {
    list: participants,
    status,
    error,
  } = useSelector((state) => state.participants);

  const location = useLocation();
  const { eventId } = location.state || {};

  useEffect(() => {
    if (eventId) {
      dispatch(fetchParticipants(eventId));
    }
  }, [dispatch, eventId]);

  const [searchQuery, setSearchQuery] = useState("");
  const EVENT_ID = "your-event-id-here";
  useEffect(() => {
    dispatch(fetchParticipants(EVENT_ID));
  }, [dispatch]);

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ParticipantCard = ({ name, email }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#000] mb-3">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-[#000]">{email}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <NavHost />
      <hr className="absolute w-[153%] left-0 top-[60px] border-b border-black border-[0px]" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mt-10">
            <span className="text-[#008080] font-semibold">View </span>How
            Popular is your{" "}
            <span className="text-[#008080] font-semibold">Event</span>{" "}
          </h1>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 font-semibold text-[#008080]">
              Participants
            </div>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search participants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {status === "loading" && (
          <div className="text-center text-[#008080]">
            Loading participants...
          </div>
        )}

        {status === "failed" && (
          <div className="text-center text-red-500">No Participant</div>
        )}

        {status === "succeeded" && (
          <div>
            {filteredParticipants.length === 0 ? (
              <div className="text-center text-gray-500">
                No participants found
              </div>
            ) : (
              filteredParticipants.map((participant, index) => (
                <ParticipantCard
                  key={index}
                  name={participant.name}
                  email={participant.email}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default View_participants;
