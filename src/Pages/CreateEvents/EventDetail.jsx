import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchEventDetails } from "../../components/store/slices/eventDetailSlice";
import NavHost from "../Host/NavHost";
import EventCard from "./components/EventCard";
import InfoCard from "./components/InfoCard";
import TimelineCard from "./components/TimelineCard";

const Details = () => {
  const location = useLocation();
  const { eventId } = location.state || {};
  const dispatch = useDispatch();
  const { event, loading, error } = useSelector((state) => state.event_details);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventDetails(eventId));
    }
  }, [dispatch, eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-white ">
      <NavHost className="border-b border-gray-900" />
      <section className="flex flex-col mx-4 gap-5 mb-10">
        <div className="flex flex-col items-center justify-between mt-2 gap-1">
          <span className="font-medium text-base md:text-xl">
            {event?.title || "Loading..."}
          </span>
          <span className="font-medium text-base md:text-xl">
            Organizer: {event?.hostEmail || "Loading..."}
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center md:mx-12">
          <EventCard />
          <div className="flex flex-col gap-3">
            <InfoCard
              iconSrc="calendar.svg"
              title="Registration deadline"
              value={
                new Date(event?.registerEnd).toLocaleString() || "Loading..."
              }
            />

            <InfoCard
              iconSrc="calendar.svg"
              title="Location"
              value={event?.location || "Loading..."}
            />
            <InfoCard
              iconSrc="calendar.svg"
              title="Event Date"
              value={
                new Date(event?.startTime).toLocaleString() || "Loading..."
              }
            />
          </div>
        </div>
        <section className="flex flex-col justify-between gap-5">
          <TimelineCard
            type="Event Description"
            data={{ description: event?.description || "Loading..." }}
          />
        </section>
      </section>
    </div>
  );
};

export default Details;
