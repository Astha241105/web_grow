import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { registerInEvent } from '../components/store/slices/registerforevent'; 
import './regi.css';

const Regi = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { eventId } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    institute: '',
    type: '',
    course: '',
    duration: '',
    graduationYear: '',
  });

  const { status, error, registrationSuccess } = useSelector(
    (state) => state.eventRegistration
  );

  useEffect(() => {
    console.log('Registering for event ID:', eventId);
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (type) => {
    setFormData({
      ...formData,
      type,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("yes");

    if (!eventId) {
      console.error("Event ID is missing");
      return;
    }

    dispatch(registerInEvent({ eventId }));
  };

  return (
    <div>
      {status === 'loading' && <p>Registering for event...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {registrationSuccess && <p>Successfully registered for the event!</p>}

      <form id="form-for-event" onSubmit={handleSubmit}>
        <div id="form-for-event1">Fill your Details</div>

        <label className="form-for-events-labels">First Name:</label>
        <input
          className="form-for-events-input"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label className="form-for-events-labels">Last Name:</label>
        <input
          className="form-for-events-input"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label className="form-for-events-labels">Email:</label>
        <input
          className="form-for-events-input"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <label className="form-for-events-labels">Phone Number:</label>
        <input
          className="form-for-events-input"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <label className="form-for-events-labels">Name of Institute:</label>
        <input
          className="form-for-events-input"
          name="institute"
          placeholder="Name of Institute"
          value={formData.institute}
          onChange={handleChange}
        />

        <label className="form-for-events-labels">Type:</label>
        <div id="button-for-options">
          <button
            type="button"
            className="button-for-type"
            onClick={() => handleTypeChange('College Student')}
          >
            College Student
          </button>
          <button
            type="button"
            className="button-for-type"
            onClick={() => handleTypeChange('School Student')}
          >
            School Student
          </button>
          <button
            type="button"
            className="button-for-type"
            onClick={() => handleTypeChange('Professional')}
          >
            Professional
          </button>
          <button
            type="button"
            className="button-for-type"
            onClick={() => handleTypeChange('Others')}
          >
            Others
          </button>
        </div>

        <label className="form-for-events-labels">Course:</label>
        <input
          className="form-for-events-input"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
        />

        <div id="last-options">
          <div className="last-options-parts">
            <label className="form-for-events-labels">Duration:</label>
            <input
              className="form-for-events-input1"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
          <div className="last-options-parts">
            <label className="form-for-events-labels">Graduation Year:</label>
            <input
              className="form-for-events-input1"
              name="graduationYear"
              placeholder="Graduation Year"
              value={formData.graduationYear}
              onChange={handleChange}
            />
          </div>
        </div>

        <button id="form-for-event-next" type="submit">
          Next
        </button>
      </form>
    </div>
  );
};

export default Regi;
