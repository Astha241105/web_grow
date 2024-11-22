import React from 'react';
import "./edit.css";

const Edit = () => {
  return (
    <div id="edit-profile">
      <div id="edit-my-profile">My Profile</div>
      <div id="edit-my-profile-1">
        <img id="part-profile-details-image" />
        <div id="change-profile">Change profile</div>
      </div>
      <div id="edit-profile-options">
        <label htmlFor="edit-profile-options-input1" className="edit-profile-options-labels">Name :</label>
        <input id="edit-profile-options-input1" className="edit-profile-options-input" />
        
        <label htmlFor="edit-profile-options-input2" className="edit-profile-options-labels">Email :</label>
        <input id="edit-profile-options-input2" className="edit-profile-options-input" />
        
        <label htmlFor="edit-profile-options-input3" className="edit-profile-options-labels">Name of Institute :</label>
        <input id="edit-profile-options-input3" className="edit-profile-options-input" />
      </div>
    </div>
  );
};

export default Edit;
