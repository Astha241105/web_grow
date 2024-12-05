import React from 'react';
import "./teampopup.css";

const Teampopup = ({ handlePopupClick }) => {
  return (
    <div id="team-ask-pop-up">
      <div  id="team-ask-pop-up-inside">
        <img src="/createteampop.svg" id="create-team1" onClick={handlePopupClick} />
        <div>Create a team</div>
      </div>
      <div  id="team-ask-pop-up-inside">
        <img src="/jointeampop.svg" id="join-a-team" onClick={handlePopupClick} />
        <div>Join a Team</div>
      </div>
    </div>
  );
};

export default Teampopup;
