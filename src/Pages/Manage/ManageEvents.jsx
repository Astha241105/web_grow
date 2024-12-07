import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchEvents,
  deleteEvent,
} from "../../components/store/slices/eventmanageSlice";
import NavHost from "../Host/NavHost";

const Event_Manage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, loading, error, deleteStatus, deleteError } = useSelector(
    (state) => state.eventmanage
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleEdit = (event) => {
    navigate("/update-event", {
      state: {
        eventId: event.id,
        eventData: event,
      },
    });
  };

  const metrics = [
    {
      label: "Total Events",
      value: events.length.toString(),
      bgColor: "bg-[#B72A7E]",
      textColor: "text-white",
    },
  ];

  const MetricCard = ({ label, value, bgColor, textColor }) => (
    <div
      className={`${bgColor} ${textColor} rounded-lg px-4 py-2 flex items-center space-x-2`}
    >
      <div className="w-6 h-6 flex">
        {label === "Total Events" && <img src="GG.svg" alt="Events" />}
      </div>
      <div className="flex gap-[10px]">
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );

  const handleParticipants = (id) => {
    navigate("/view-participants", {
      state: {
        eventId: id,
      },
    });
  };

  const EventCard = ({
    id,
    title,
    college,
    tag,
    endTime,
    date,
    mode,
    imageUrl,
    ...event
  }) => {
    const navigate = useNavigate();
    const eventDate = new Date(date);
    const formattedDate = eventDate.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const isPastEvent = endTime ? new Date(endTime) < new Date() : false;

    const handleDelete = () => {
      console.log("Event ID to delete:", id);
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the event "${title}"?`
      );
      if (confirmDelete) {
        dispatch(deleteEvent(id));
      }
    };
    const handleCreateQuiz = (e) => {
      e.stopPropagation();
      navigate("/create-quiz", {
        state: {
          eventId: id,
          eventData: {
            id,
            title,
            college,
            tag,
            date,
            mode,
            ...event,
          },
        },
      });
    };

    const handleHost = () => {
      navigate("/host-manage", {
        state: {
          eventId: id,
          eventData: {
            id,
            title,
            college,
            tag,
            date,
            mode,
            ...event,
          },
        },
      });
    };

    const handleCardClick = () => {
      navigate("/event-detail", {
        state: {
          eventId: id,
          eventData: {
            id,
            title,
            college,
            tag,
            date,
            mode,
            imageUrl,
            ...event,
          },
        },
      });
    };
    const cardClasses = isPastEvent
      ? "border border-gray-400 rounded-lg p-4 mb-4 bg-gray-100 text-gray-600"
      : "border border-[#000] rounded-lg p-4 mb-4 bg-white";

    // Modify image styling for past events
    const imageClasses = isPastEvent
      ? "w-12 h-12 bg-gray-300 rounded overflow-hidden grayscale"
      : "w-12 h-12 bg-gray-200 rounded overflow-hidden";

    return (
      <div className={cardClasses} onClick={handleCardClick}>
        <div className="flex items-start justify-between">
          <div className="flex space-x-4">
            <div className={imageClasses}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200"></div>
              )}
            </div>
            <div>
              <h3
                className={`font-semibold ${
                  isPastEvent ? "text-gray-500" : ""
                }`}
              >
                {title}
                {isPastEvent && (
                  <span className="ml-2 text-xs text-gray-400">
                    (Past Event)
                  </span>
                )}
              </h3>
              <p
                className={`text-sm font-medium ${
                  isPastEvent ? "text-gray-500" : "text-[#000]"
                }`}
              >
                {college}
              </p>
              <span
                className={`inline-block px-3 py-1 text-sm border rounded-full mt-1 font-medium ${
                  isPastEvent
                    ? "bg-gray-200 border-gray-300 text-gray-500"
                    : "bg-white border-black"
                }`}
              >
                {tag}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2">
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isPastEvent
                    ? "bg-gray-200 border-gray-300 text-gray-500"
                    : "bg-white border-black"
                }`}
              >
                {mode || "Not Available"}
              </div>
              <span
                className={`text-sm font-medium ${
                  isPastEvent ? "text-gray-500" : "text-[#000]"
                }`}
              >
                {formattedDate}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHost();
                }}
              >
                <img src="addHost.svg" alt="Delete" />
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleParticipants(id);
                }}
              >
                <img src="teams.svg" alt="View Participants" />
              </button>
              {mode === "online" && tag === "Quiz" && (
                <button
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={handleCreateQuiz}
                >
                  <img src="Quiz.svg" alt="Create Quiz" />
                </button>
              )}
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit({
                    id,
                    title,
                    college,
                    tag,
                    date,
                    mode,
                    imageUrl,
                    ...event,
                  });
                }}
              >
                <img src="Pencil.svg" alt="Edit" />
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                <img src="delete.svg" alt="Delete" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF]">
      <NavHost />
      <hr className="absolute w-[153%] left-0 top-[60px] border-b border-black border-[0px]" />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mt-8">
            <span className="text-[#008080] font-semibold text-2xl">
              Manage
            </span>
            <span className="font-semibold text-xl">
              {" "}
              Your Events with ease
            </span>
          </h1>
        </div>

        <div className="flex md:flex-row flex-col gap-2  mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="space-y-4">
          {loading && <p>Loading events...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {deleteStatus === "loading" && <p>Deleting event...</p>}
          {deleteError && (
            <p className="text-red-500">Delete Error: {deleteError}</p>
          )}
          {!loading &&
            !error &&
            events.map((event) => (
              <EventCard key={event.id} {...event} mode={event.mode} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default Event_Manage;
