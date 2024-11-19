import React from 'react';
import "./participantDetails.css";
import iii1 from "./ant.png";
import iii2 from "./fluent.png";
import iii3 from "./Group2.png";

const ParticipantDetails = () => {
  return (
    <div id="part-details">
      <div id="part-details-1">
        <div>
          <div id="name-part">Name</div>
          <div id="email-part">Email</div>
        </div>
        <div id="part-eligible"></div>
      </div>
      <button id="see-details">See Details</button>
      <div  id="registered"className='part-details-info'>
        <img className="part-details-img" src={iii2} alt="Registered Icon" />
        <div  className="minor-details">Registered Candidates</div>
      </div>
      <div id="team" className='part-details-info'>
        <img className="part-details-img" src={iii1} alt="Team Size Icon" />
        <div className="minor-details">Team Size</div>
      </div>
      <div id="deadline" className='part-details-info'>
        <img className="part-details-img" src={iii3} alt="Deadline Icon" />
        <div  className="minor-details">Deadline</div>
      </div>
    </div>
  );
}

export default ParticipantDetails;
