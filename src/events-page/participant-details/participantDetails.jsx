import React from 'react';
import "./participantDetails.css";

const ParticipantDetails = () => {
  return (
    <div id="part-details">
      <div id="part-details-1">
        <div>
          <div id="name-part">Name</div>
          <div id="email-part">Email</div>
        </div>
        <div id="part-eligible"><img id="tick-svg"src="/tick.svg"></img>Eligible</div>
      </div>
      <button id="see-details"><span>See Details<br></br>
          (Check your team status)</span></button>
          <div id="line"></div>
      <div  id="registered"className='part-details-info'>
        <img className="part-details-img" src="/people.svg" alt="Registered Icon" />
        <div className="minor-details">
        <div  >Registered Candidates</div>
        <div>400</div></div>
      </div>
      <div id="team" className='part-details-info'>
        <img className="part-details-img" src="/team.svg" alt="Team Size Icon" />
        <div  className="minor-details">
        <div>Team Size</div>
        <div>400</div></div>
      </div>
      <div id="deadline" className='part-details-info'>
        <img className="part-details-img" src="/deadline.svg" alt="Deadline Icon" />
        <div className="minor-details">
        <div  >Deadline</div>
        <div>400</div></div>
      </div>
    </div>
  );
}

export default ParticipantDetails;
