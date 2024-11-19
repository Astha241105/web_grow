import React from 'react';
import "./regi.css";

const Regi = () => {
  return (
    <div>
      <div id="form-details"></div>
      <form id="form-for-event">
        <div id="form-for-event1">Fill your Details</div>

        <label className="form-for-events-labels">First Name:</label>
        <input 
          className="form-for-events-input" 
          placeholder="First Name"
        />

        <label className="form-for-events-labels">Last Name:</label>
        <input 
          className="form-for-events-input" 
          placeholder="Last Name"
        />

        <label className="form-for-events-labels">Email:</label>
        <input 
          className="form-for-events-input" 
          placeholder="Email"
        />

        <label className="form-for-events-labels">Phone Number:</label>
        <input 
          className="form-for-events-input" 
          placeholder="Phone Number"
        />

        <label className="form-for-events-labels">Name of Institute:</label>
        <input 
          className="form-for-events-input" 
          placeholder="Name of Institute"
        />
        <label className="form-for-events-labels">Type</label>
        <div id="button-for-options">
          <button className="button-for-type">College Student</button>
          <button className="button-for-type">School Student</button>
          <button className="button-for-type">Professional</button>
          <button className="button-for-type">Others</button>
        </div>
        <label className="form-for-events-labels">Course:</label>
        <input 
          className="form-for-events-input" 
          placeholder="Course"
        />
        <div id="last-options">
          <div>
            <label className="form-for-events-labels">Duration:</label>
            <input
            className="form-for-events-input1" 
            placeholder="Duration"></input>
          </div>
          <div>
            <label className="form-for-events-labels">Graduation Year:</label>
            <input
            className="form-for-events-input1" 
            placeholder="Graduation year"></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Regi;
