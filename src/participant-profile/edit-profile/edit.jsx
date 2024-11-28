import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateParticipantProfile } from '../../components/store/slices/participantprofile'; // Adjust the path as needed
import Imgoption from '../imgoptions/imgoption'; // Import Imgoption component
import "./edit.css";

const Edit = () => {
  const { profile, isLoading, error } = useSelector((state) => state.participant);
  const dispatch = useDispatch();

  const [editedProfile, setEditedProfile] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    imageUrl: ''
  });

  const [isEditingImage, setIsEditingImage] = useState(false); // State to toggle image input

  useEffect(() => {
    if (profile) {
      setEditedProfile({
        firstName: profile?.firstname || '',
        lastName: profile?.lastname || '',
        mobile: profile?.mobile || '',
        imageUrl: profile?.imageUrl || ''
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSave = () => {
    dispatch(updateParticipantProfile(editedProfile)); // Dispatch the update to save the profile
  };

  const handleImageClick = () => {
    setIsEditingImage(true); // Enable image URL input when the image is clicked
  };

  const handleImageSave = () => {
    setIsEditingImage(false); // Save and exit image input mode
  };

  const handleImageOptionClick = (url) => {
    setEditedProfile(prevState => ({
      ...prevState,
      imageUrl: url // Update the image URL with the selected one
    }));
    setIsEditingImage(false); // Close the image options
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="edit-profile">
      <div id="edit-my-profile">My Profile</div>
      <div id="edit-my-profile-1">
        <img
          id="part-profile-details-image"
          src={editedProfile.imageUrl || "/default-profile.svg"} 
          alt="Profile"
          onClick={handleImageClick} // Show input when clicked
        />
        <div id="change-profile">Change profile</div>
      </div>

      {isEditingImage && (
        // Conditionally render Imgoption component when editing image
        <Imgoption onImageClick={handleImageOptionClick} />
      )}

      <div id="edit-profile-options">
        <label htmlFor="firstName" className="edit-profile-options-labels">
          First Name:
        </label>
        <input
          id="firstName"
          className="edit-profile-options-input"
          value={editedProfile.firstName}
          onChange={handleInputChange}
        />

        <label htmlFor="lastName" className="edit-profile-options-labels">
          Last Name:
        </label>
        <input
          id="lastName"
          className="edit-profile-options-input"
          value={editedProfile.lastName}
          onChange={handleInputChange}
        />
        
        <label htmlFor="mobile" className="edit-profile-options-labels">
          Mobile:
        </label>
        <input
          id="mobile"
          className="edit-profile-options-input"
          value={editedProfile.mobile}
          onChange={handleInputChange}
        />

        <label htmlFor="imageUrl" className="edit-profile-options-labels">
          Image URL:
        </label>
        <input
          id="imageUrl"
          className="edit-profile-options-input"
          value={editedProfile.imageUrl}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button id="save-profile-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Edit;
