import React from 'react'
import "./teampopup.css"

const Teampopup = ({ handlePopupClick }) => {
  return (
    <div id="team-ask-pop-up">
      <img src="/createteampop.svg" id="create-team" onClick={handlePopupClick}>
        Create a team
        </img>
      <img src="/jointeampop.svg" id="join-a-team" onClick={handlePopupClick}>
        Join a team
      </img>
      
    </div>
  );
};

export default Teampopup
