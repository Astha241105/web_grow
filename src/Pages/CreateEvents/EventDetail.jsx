import React, { useState, useEffect } from "react";
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
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked((prev) => !prev);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Loading...";
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date) + " IST";
  };

  const stagesData = [
    {
      description: "This is stage 1.",
      day: "Day 1",
    },
    {
      description: "This is stage 2.",
      day: "Day 2",
    },
  ];

  const deadlinesData = {
    title: "Registration deadline",
    date: formatDate(event?.registerEnd),
  };

  const contactData = {
    name: "Anshika Gupta",
    email: "an@gmail.com",
    phone: "+91 9565656565",
  };

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventDetails(eventId));
    }
  }, [dispatch, eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-white">
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
              value={formatDate(event?.registerEnd)}
            />
            <InfoCard
              iconSrc="calendar.svg"
              title="Location"
              value={event?.location || "Loading..."}
            />
            <InfoCard
              iconSrc="calendar.svg"
              title="Event Date"
              value={formatDate(event?.startTime)}
            />
          </div>
        </div>
        <section className="flex flex-col justify-between gap-5">
          <TimelineCard
            type="Stages and Timeline"
            data={stagesData}
            eventId={eventId}
          />
          <TimelineCard type="Deadlines" data={deadlinesData} />
          <TimelineCard type="Contact the organiser" data={contactData} />
        </section>
      </section>
    </div>
  );
};

export default Details;
