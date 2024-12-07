import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostProfile, updateHostProfile } from '../../components/store/slices/updatehostprofile';

const EditHostProfile = () => {
  const { profile, loading, error } = useSelector((state) => state.hostProfile);
  const dispatch = useDispatch();

  // Editable fields: firstname, email, and mobile
  const [editedProfile, setEditedProfile] = useState({
    firstname: '',
    email: '',
    mobile: '',
  });

  useEffect(() => {
    dispatch(fetchHostProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setEditedProfile({
        firstname: profile.firstname || '',
        email: profile.email || '',
        mobile: profile.mobile || '',
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Include the entire profile but only update the fields being edited
    const updatedProfile = {
      ...profile,
      firstname: editedProfile.firstname,
      email: editedProfile.email,
      mobile: editedProfile.mobile,
    };

    dispatch(updateHostProfile(updatedProfile));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="edit-profile">
      <h2>Edit Profile</h2>

      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          value={editedProfile.firstname}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={editedProfile.email}
          onChange={handleInputChange}
          disabled // Email is usually not editable, so this field is disabled
        />
      </div>

      <div>
        <label>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={editedProfile.mobile}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditHostProfile;
