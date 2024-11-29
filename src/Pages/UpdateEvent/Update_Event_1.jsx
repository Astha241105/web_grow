import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateEventApi } from "../../components/store/slices/updateeventSlice";

const Update_Event_1 = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { eventData: basicDetails } = useSelector((state) => state.updateEvent);
  const [eventId, setEventId] = useState(() => location.state?.eventId);

  useEffect(() => {
    if (!eventId) {
      console.error("No event ID provided");
    }
  }, [eventId]);

  const [formData, setFormData] = useState({
    participationType: "",
    minTeamSize: "",
    maxTeamSize: "",
    registrationStartDate: "",
    registrationStartTime: "",
    registrationEndDate: "",
    registrationEndTime: "",
    maxRegistrations: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "participationType",
      "registrationStartDate",
      "registrationStartTime",
      "registrationEndDate",
      "registrationEndTime",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    const completeEventData = {
      eventId,
      ...basicDetails,
      participationType: formData.participationType,
      minTeamSize: formData.minTeamSize || 1,
      maxTeamSize: formData.maxTeamSize || 1,
      registerStart: `${formData.registrationStartDate}T${formData.registrationStartTime}:00`, // Add seconds and use 'T' separator
      registerEnd: `${formData.registrationEndDate}T${formData.registrationStartTime}:00`, // Same for end date
      maxRegistrations: formData.maxRegistrations,
    };

    try {
      console.log("Submitting event data:", completeEventData);
      const resultAction = await dispatch(updateEventApi(completeEventData));

      if (updateEventApi.fulfilled.match(resultAction)) {
        alert("Event updated successfully!");
      } else {
        console.error("Update failed", resultAction.payload);
        alert("Failed to update event: " + resultAction.payload?.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred: " + error.message);
    }
  };

  const styles = {
    inputContainer: {
      display: "flex",
      gap: "16px",
    },
    inputWrapper: {
      position: "relative",
      flex: "1",
    },
    inputLabel: {
      position: "absolute",
      right: "35px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#000",
      pointerEvents: "none",
      fontSize: "14px",
      fontWeight: "400",
    },
  };

  return (
    <div className="ce">
      <div className="ce-gradient z-[-1]"> </div>
      <div className="ce-gradient2 z-[-1]"></div>
      <div className="ce-form">
        <div className="ce-progress-bar">
          <div className="ce-back-button">
            <img src="/back-btn.svg" className="ce-bbtn" alt="back" />
            <button className="ce-black">Back</button>
          </div>
          <div className="steps">
            <div className="step unactive">
              <img src="1.svg" alt="step 1" />
              Basic Details
            </div>
            <div className="step-divider">
              <img src="Line.svg" alt="divider" />
            </div>
            <div className="step1">
              <img src="2.svg" alt="step 2" />
              Registration Details
            </div>
          </div>
        </div>
        <hr />
        <div className="ce-form-content">
          <div className="ce-form-group">
            <label>Participation Type</label>
            <div className="ce-button-group">
              <button
                className={`option-button ${
                  formData.participationType === "Individual" ? "active" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    participationType: "Individual",
                  }))
                }
              >
                <img src="Globe.svg" alt="individual" />
                <div>
                  <div className="button-title">Individual</div>
                </div>
              </button>
              <button
                className={`option-button ${
                  formData.participationType === "Team" ? "active" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    participationType: "Team",
                  }))
                }
              >
                <img src="Globe.svg" alt="team" />
                <div>
                  <div className="button-title">Team</div>
                </div>
              </button>
            </div>
          </div>

          {formData.participationType === "Team" && (
            <div className="ce-form-group">
              <label>Participation as a Team</label>
              <div style={styles.inputContainer}>
                <div style={styles.inputWrapper}>
                  <input
                    className="ce-placeholder"
                    type="number"
                    name="minTeamSize"
                    value={formData.minTeamSize}
                    onChange={handleInputChange}
                    placeholder=""
                  />
                  <span style={styles.inputLabel}>Min</span>
                </div>
                <div style={styles.inputWrapper}>
                  <input
                    type="number"
                    className="ce-placeholder"
                    name="maxTeamSize"
                    value={formData.maxTeamSize}
                    onChange={handleInputChange}
                    placeholder=""
                  />
                  <span style={styles.inputLabel}>Max</span>
                </div>
              </div>
            </div>
          )}
          <div className="ce-form-group">
            <label>Registration Start Date and Time</label>
            <div style={styles.inputContainer}>
              <div style={styles.inputWrapper}>
                <label>Date</label>
                <input
                  className="ce-placeholder"
                  type="date"
                  name="registrationStartDate"
                  value={formData.registrationStartDate}
                  onChange={handleInputChange}
                />
              </div>
              <div style={styles.inputWrapper}>
                <label>Time</label>
                <input
                  className="ce-placeholder"
                  type="time"
                  name="registrationStartTime"
                  value={formData.registrationStartTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="ce-form-group">
            <label>Registration End Date and Time</label>
            <div style={styles.inputContainer}>
              <div style={styles.inputWrapper}>
                <label>Date</label>
                <input
                  className="ce-placeholder"
                  type="date"
                  name="registrationEndDate"
                  value={formData.registrationEndDate}
                  onChange={handleInputChange}
                />
              </div>
              <div style={styles.inputWrapper}>
                <label>Time</label>
                <input
                  className="ce-placeholder"
                  type="time"
                  name="registrationEndTime"
                  value={formData.registrationEndTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="ce-form-group">
            <label>Number of Registrations allowed (optional)</label>
            <input
              type="number"
              placeholder="Enter count"
              name="maxRegistrations"
              value={formData.maxRegistrations}
              onChange={handleInputChange}
            />
          </div>
          <div className="ce-form-actions">
            <button className="ce-next-button" onClick={handleSubmit}>
              Update Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update_Event_1;
