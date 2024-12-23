import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerInEvent } from '../components/store/slices/registerforevent'; 
import { fetchEventDetailsPublic } from "../components/store/slices/publiceventdetails";
import Teampopup from "./team-pop-up/teampopup";
import './regi.css';

const Regi = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
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

  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [showTeamPopup, setShowTeamPopup] = useState(false);

  const { event, status, error } = useSelector((state) => state.eventDetailsPublic);
  console.log(event?.teamCreationAllowed, "yea");

  const teamPopupRef = useRef(null);

  useEffect(() => {
    if (isSubmitted && eventId) {
      const registerAndFetchDetails = async () => {
        try {
          const resultAction = await dispatch(registerInEvent({ eventId })).unwrap();
          console.log(resultAction);
  
          if (resultAction.success) {
            console.log("Registration successful");
            await dispatch(fetchEventDetailsPublic(eventId)).unwrap();
            console.log("Event details fetched successfully");
  
            if (event?.teamCreationAllowed) {
              setShowTeamPopup(true);
            } else {
              navigate('/'); 
            }
          }
        } catch (error) {
          console.error("Registration failed:", error);
        }
      };
  
      registerAndFetchDetails();
    }
  }, [isSubmitted, eventId, dispatch, event?.teamCreationAllowed, navigate]);
  
  useEffect(() => {

    if (showTeamPopup && teamPopupRef.current) {
      teamPopupRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showTeamPopup]);

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
    setIsSubmitted(true);
  };

  const handlePopupClick = () => {
    navigate('/regiteam', { state: { eventId } });
  };

  return (
    <div>
       {showTeamPopup && (
            <Teampopup handlePopupClick={handlePopupClick} ref={teamPopupRef} />
          )}
      <div className={showTeamPopup ? "blur-background" : ""}>
        <form id="form-for-event" onSubmit={handleSubmit}>
          <div id="form-for-event1">Fill your Details</div>
         
          <label className="form-for-events-labels">First Name:</label>
          <input
            className="form-for-events-input"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label className="form-for-events-labels">Last Name:</label>
          <input
            className="form-for-events-input"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label className="form-for-events-labels">Email:</label>
          <input
            className="form-for-events-input"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="form-for-events-labels">Phone Number:</label>
          <input
            className="form-for-events-input"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <label className="form-for-events-labels">Name of Institute:</label>
          <input
            className="form-for-events-input"
            name="institute"
            placeholder="Name of Institute"
            value={formData.institute}
            onChange={handleChange}
            required
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
    </div>
  );
};

export default Regi;
