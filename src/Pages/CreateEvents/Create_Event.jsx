import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createEventApi,
  resetState,
} from "../../components/store/slices/create_event_Slice";


const Create_Events = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventState = useSelector((state) => state.createEvent);
  const roomState = useSelector((state) => state.rooms);
  const { eventData, imageUrl, loading, error, success } = eventState;
  const {
    loading: roomLoading,
    error: roomError,
    success: roomSuccess,
  } = roomState;

  const [formData, setFormData] = useState({
    participationType: eventData.participationType || "",
    minTeamSize: eventData.minTeamSize || "",
    maxTeamSize: eventData.maxTeamSize || "",
    registrationStartDate: eventData.registrationStartDate || "",
    registrationStartTime: eventData.registrationStartTime || "",
    registrationEndDate: eventData.registrationEndDate || "",
    registrationEndTime: eventData.registrationEndTime || "",
    capacityMin: 0,
    maxRegistrations: eventData.maxRegistrations || "",
  });

  const [hostSelected, setHostSelected] = useState(false);
  const [showHostPrompt, setShowHostPrompt] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdEventId, setCreatedEventId] = useState(null);

  const handleHostPromptResponse = (response) => {
    setHostSelected(response);
    setShowHostPrompt(false);
    setShowSuccessModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "roomsAvailable") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        roomNames: Array(Number(value)).fill(""),
      }));
    }
  };

  const handleRoomNameChange = (index, value) => {
    const newRoomNames = [...formData.roomNames];
    newRoomNames[index] = value;
    setFormData((prev) => ({ ...prev, roomNames: newRoomNames }));
  };

const handleNextStep = () => {
  const eventPayload = {
    imageUrl:
      imageUrl || "https://webgrowbucket.s3.ap-south-1.amazonaws.com/default",
    title: eventData.opportunityTitle,
    category: eventData.opportunityType,
    description: eventData.aboutOpportunity,
    location: eventData.organization,
    mode: eventData.eventMode,
    registerStart:
      formData.registrationStartDate && formData.registrationStartTime
        ? `${formData.registrationStartDate}T${formData.registrationStartTime}:00`
        : null,
    registerEnd:
      formData.registrationEndDate && formData.registrationEndTime
        ? `${formData.registrationEndDate}T${formData.registrationEndTime}:00`
        : null,
    startTime:
      formData.EventStartDate && formData.EventStartTime
        ? `${formData.EventStartDate}T${formData.EventStartTime}:00`
        : null,
    endTime:
      formData.EventEndDate && formData.EventEndTime
        ? `${formData.EventEndDate}T${formData.EventEndTime}:00`
        : null,
    capacityMax: formData.maxRegistrations,
    capacityMin: formData.capacityMin,
    festival: eventData.festival || null,
    teamCreationAllowed: formData.participationType === "Team",
    maxTeamSize: formData.maxTeamSize,
    minTeamSize: formData.minTeamSize,
  };

  dispatch(createEventApi(eventPayload))
    .then((response) => {
      const eventId = response.payload.id;
      console.log("Created Event ID:", eventId);
      setCreatedEventId(eventId);

      if (formData.roomNames && formData.roomNames.length > 0) {
        const roomPayload = {
          eventId: eventId,
          roomNames: formData.roomNames,
        };

        console.log("Room Creation Payload:", roomPayload);

        dispatch(createEventRooms(roomPayload))
          .then(() => {
            setShowSuccessModal(true); // Show success modal after room creation is successful
          })
          .catch((roomError) => {
            console.error("Room creation failed", roomError);
          });
      } else {
        setShowSuccessModal(true); // Show success modal if no rooms are to be created
      }
    })
    .catch((error) => {
      console.error("Event creation failed", error);
    });
};

  const handleResetAndClose = () => {
    dispatch(resetState());
    dispatch(resetRoomState());
    setShowSuccessModal(false);
    navigate("/event-manage");
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
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "50",
    },
    backdrop: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(4px)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: "51",
      textAlign: "center",
      minWidth: "300px",
    },
    modalButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      marginTop: "1.5rem",
    },
    modalButton: {
      padding: "0.5rem 2rem",
      borderRadius: "0.25rem",
      border: "1px solid #e2e8f0",
      cursor: "pointer",
    },
    successButton: {
      backgroundColor: "#0D9488",
      color: "white",
      padding: "0.5rem 2rem",
      borderRadius: "0.25rem",
      border: "none",
      cursor: "pointer",
      marginTop: "1rem",
      minWidth: "150px",
    },
    closeButton: {
      backgroundColor: "#0D9488",
      color: "white",
      padding: "0.5rem 2rem",
      borderRadius: "0.25rem",
      border: "none",
      cursor: "pointer",
      marginTop: "0.5rem",
      minWidth: "150px",
    },
  };

  return (
    <div className="ce">
      <div className="ce-gradient z-[-1] w-[200px] md:w-[875px] h-[1024px]">
        {" "}
      </div>
      <div className="ce-gradient2 z-[-1] w-[200px] md:w-[875px] h-[1024px]"></div>
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
        <hr className="w-full" />
        <div
          className={`ce-form-content ${
            showHostPrompt || showSuccessModal ? "pointer-events-none" : ""
          }`}
        >
          <div className="ce-form-group">
            <label>Participation Type</label>
            <div className="ce-button-group">
              <button
                className={`option-button ${
                  formData.participationType === "Individual" ? "selected" : ""
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
                  formData.participationType === "Team" ? "selected" : ""
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
          <div className="ce-form-group">
            {formData.participationType === "Team" && (
              <>
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
              </>
            )}
          </div>

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
            <label>Event Start Date and Time</label>
            <div style={styles.inputContainer}>
              <div style={styles.inputWrapper}>
                <label>Date</label>
                <input
                  className="ce-placeholder"
                  type="date"
                  name="EventStartDate"
                  value={formData.EventStartDate}
                  onChange={handleInputChange}
                />
              </div>
              <div style={styles.inputWrapper}>
                <label>Time</label>
                <input
                  className="ce-placeholder"
                  type="time"
                  name="EventStartTime"
                  value={formData.EventStartTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="ce-form-group">
            <label>Event End Date and Time</label>
            <div style={styles.inputContainer}>
              <div style={styles.inputWrapper}>
                <label>Date</label>
                <input
                  className="ce-placeholder"
                  type="date"
                  name="EventEndDate"
                  value={formData.EventEndDate}
                  onChange={handleInputChange}
                />
              </div>
              <div style={styles.inputWrapper}>
                <label>Time</label>
                <input
                  className="ce-placeholder"
                  type="time"
                  name="EventEndTime"
                  value={formData.EventEndTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="ce-form-group">
            <label>Number of Registrations allowed </label>
            <input
              type="number"
              placeholder="Enter count"
              name="maxRegistrations"
              value={formData.maxRegistrations}
              onChange={handleInputChange}
            />
          </div>

          <div className="ce-form-actions">
            <button
              className="ce-next-button"
              onClick={handleNextStep}
              disabled={loading}
            >
              Next
            </button>
          </div>
        </div>

        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <h3 className="text-lg font-semibold mb-4">
                Event Created Successfully!
              </h3>
              <button
                className="bg-teal-600 text-white px-4 py-2 rounded"
                onClick={handleResetAndClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default Create_Events;
