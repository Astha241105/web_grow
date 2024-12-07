import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateParticipantProfile,
  fetchParticipantProfile, // Add this to refetch the profile
} from '../../components/store/slices/participantprofile'; // Adjust the path as needed
import Imgoption from '../imgoptions/imgoption';
import './edit.css';

const Edit = () => {
  const { profile, isLoading, error } = useSelector((state) => state.participant);
  const dispatch = useDispatch();

  const [editedProfile, setEditedProfile] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    imageUrl: '',
  });

  const [isEditingImage, setIsEditingImage] = useState(false);

  useEffect(() => {
    // Fetch profile data when the component mounts
    dispatch(fetchParticipantProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setEditedProfile({
        firstName: profile?.firstname || '',
        lastName: profile?.lastname || '',
        mobile: profile?.mobile || '',
        imageUrl: profile?.imageUrl || '',
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSave = () => {
    dispatch(updateParticipantProfile(editedProfile))
      .unwrap()
      .then(() => {
        // Refetch the updated profile after successful save
        dispatch(fetchParticipantProfile());
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  const handleImageClick = () => {
    setIsEditingImage(true);
  };

  const handleImageOptionClick = (url) => {
    setEditedProfile((prevState) => ({
      ...prevState,
      imageUrl: url,
    }));
    setIsEditingImage(false);
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
          src={editedProfile.imageUrl || '/default-profile.svg'}
          onClick={handleImageClick}
          alt="Profile"
        />
        <div id="change-profile">Change profile</div>
      </div>

      {isEditingImage && <Imgoption onImageClick={handleImageOptionClick} />}

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
