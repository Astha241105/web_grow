import React from 'react'
import "./teampopup.css"

const Teampopup = ({ handlePopupClick }) => {
  return (
    <div id="team-ask-pop-up">
      <div id="create-team" onClick={handlePopupClick}>
        Create a team
      </div>
      <div id="join-a-team" onClick={handlePopupClick}>
        Join a team
      </div>
    </div>
  );
};

export default Teampopup
