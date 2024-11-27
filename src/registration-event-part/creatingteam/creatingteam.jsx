import React, { useState } from 'react';
import './creatingteam.css';

const Creatingteam = () => {
  const [selected, setSelected] = useState('create');

  return (
    <div id="create-or-join">
        <div id="create-and-cancel">
     <div id="create-and-join">
      <div
        id="creating-team"
        className={selected === 'create' ? 'active' : ''}
        onClick={() => setSelected('create')}
      >
        Create team
      </div>
      <div
        id="joining-team"
        className={selected === 'join' ? 'active' : ''}
        onClick={() => setSelected('join')}
      >
        Join team
      </div>
      </div>
      <div id="cancel-part-team">Cancel Team</div>
      </div>
      <div id="create-team-name">
        <label className="create-team-name-label">Team name</label>
        <input id="create-team-name-input"></input>
      </div>
      <div className="create-team-name-label">Team Members</div>
      <div id="complete-team">Add team members to complete the team</div>
      <div id="create-member-card"></div>
      <button id="create-add-members">Add Members</button>
    </div>
  );
};

export default Creatingteam;
