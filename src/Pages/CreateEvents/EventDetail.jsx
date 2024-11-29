import React, { useState } from "react";
import NavHost from "../Host/NavHost";
import EventCard from "./components/EventCard";
import InfoCard from "./components/InfoCard";
import TimelineCard from "./components/TimelineCard";

const details = () => {
  const stagesData = {
    description:
      "This will be an online quiz on webgrow. You will be given 2 minutes to answer a question.",
    date: "To be announced",
  };

  const deadlinesData = {
    title: "Registration deadline",
    date: "25 Nov 24, 11:00 PM IST",
  };

  const contactData = {
    name: "Anshika Gupta",
    email: "an@gmail.com",
    phone: "+91 9565656565",
  };

  const rewardsData = {
    rewards: [
      { title: "Winner", description: "" },
      { title: "First Runner-up", description: "" },
      { title: "Second Runner-up", description: "" },
    ],
  };
  return (
    <div className="min-h-screen bg-white ">
      <NavHost className="border-b border-gray-900" />
      <section className="flex flex-col mx-4 gap-5 mb-10">
        <div className="flex flex-col items-center justify-between mt-2 gap-1">
          <span className=" font-medium text-base md:text-xl">
            {" "}
            Host Quiz | General Knowledge{" "}
          </span>
          <span className="font-medium text-base md:text-xl">
            {" "}
            Organizers- Anshika Gupta
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-5  justify-between items-center  md:mx-12">
          <EventCard />
          <div className="flex flex-col gap-3">
            <InfoCard
              icon="📅"
              title="Registration deadline"
              value="13 Days Left"
            />
            <InfoCard
              icon="📅"
              title="Registration deadline"
              value="13 Days Left"
            />
            <InfoCard
              icon="📅"
              title="Registration deadline"
              value="13 Days Left"
            />
          </div>
        </div>
        <section className="flex flex-col justify-between gap-5">
          <TimelineCard
            type="Stages and Timeline"
            data={stagesData}
            onEdit={true}
          />
          <TimelineCard type="Deadlines" data={deadlinesData} />
          <TimelineCard type="Contact the organiser" data={contactData} />
          <TimelineCard type="Rewards" data={rewardsData} />
        </section>
      </section>
    </div>
  );
};

export default details;
