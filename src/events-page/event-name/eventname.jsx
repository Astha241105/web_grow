import React from 'react';
import './eventname.css';

const Eventname = () => {
  return (
    <div id="for-content-and-image">
      <div id="eventname-back">
        <div id="name-of-event">UX Hackathon</div>
        <div id="institute">
          <img className="event-name-images" src="/college.svg" alt="college" />
          <div className="eventname-text">Ajay Kumar Garg Engineering College</div>
        </div>
        <div id="type-event">
          <img className="event-name-images" src="/eventtype.svg" alt="event type" />
          <div className="eventname-text">Technofest 2024</div>
        </div>
        <div id="location">
          <img className="event-name-images" src="/location.svg" alt="location" />
          <div className="eventname-text">Ghaziabad, India</div>
        </div>
        <div id="event-updatedon">
          <div id="event-updatedon-1">Updated on:&nbsp;</div>
          <div>15</div>
        </div>
        <div id="event-skill">Designing</div>
      </div>
      <div>
        <img id="logo-of-event" src="/eventlogo.svg" alt="Event Logo" />
      </div>
    </div>
  );
};

export default Eventname;
