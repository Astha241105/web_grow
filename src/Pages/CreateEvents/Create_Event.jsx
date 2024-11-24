import React, { useState } from "react";

const Create_Events = () => {
  const [showHostPrompt, setShowHostPrompt] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const handleSubmit = () => {
    setShowHostPrompt(true);
  };

  const handleHostPromptResponse = (hasHost) => {
    setShowHostPrompt(false);
    if (!hasHost) {
      setShowSuccessModal(true);
    }
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
        <div
          className={`ce-form-content ${
            showHostPrompt || showSuccessModal ? "pointer-events-none" : ""
          }`}
        >
          {/* Rest of the form content remains the same */}
          <div className="ce-form-group">
            <label>Participation Type</label>
            <div className="ce-button-group">
              <button className="option-button">
                <img src="Globe.svg" alt="individual" />
                <div>
                  <div className="button-title">Individual</div>
                </div>
              </button>
              <button className="option-button">
                <img src="Globe.svg" alt="team" />
                <div>
                  <div className="button-title">Team</div>
                </div>
              </button>
            </div>
          </div>
          <div className="ce-form-group">
            <label>Participation as a Team</label>
            <div style={styles.inputContainer}>
              <div style={styles.inputWrapper}>
                <input
                  className="ce-placeholder"
                  type="number"
                  id="numberInput"
                  placeholder=""
                />
                <span style={styles.inputLabel}>Min</span>
              </div>
              <div style={styles.inputWrapper}>
                <input
                  type="number"
                  className="ce-placeholder"
                  id="numberInput"
                  placeholder=""
                />
                <span style={styles.inputLabel}>Max</span>
              </div>
            </div>
          </div>

          <div className="ce-form-group">
            <label>Registration Start Date and Time</label>
            <div style={styles.inputContainer}>
              <div style={styles.inputWrapper}>
                <label>Date</label>
                <input
                  className="ce-placeholder"
                  type="date"
                  id="numberInput"
                  placeholder="Enter date"
                />
              </div>
              <div style={styles.inputWrapper}>
                <label>Time</label>
                <input
                  type="time"
                  className="ce-placeholder"
                  id="numberInput"
                  placeholder="Enter time"
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
                  id="numberInput"
                  placeholder="Enter date"
                />
              </div>
              <div style={styles.inputWrapper}>
                <label>Time</label>
                <input
                  type="time"
                  className="ce-placeholder"
                  id="numberInput"
                  placeholder="Enter time"
                />
              </div>
            </div>
          </div>
          <div className="ce-form-group">
            <label>Number of Registrations allowed (optional)</label>
            <input type="number" placeholder="Enter count" />
          </div>

          <div className="ce-form-actions">
            <button className="ce-next-button" onClick={handleSubmit}>
              Next
            </button>
          </div>
        </div>

        {showHostPrompt && (
          <div style={styles.modal}>
            <div style={styles.backdrop}></div>
            <div style={styles.modalContent}>
              <h3 className="text-lg font-semibold mb-4">
                Do You want to add Host?
              </h3>
              <div style={styles.modalButtons}>
                <button
                  style={styles.modalButton}
                  onClick={() => handleHostPromptResponse(true)}
                  className="bg-teal-600 text-white hover:bg-teal-700"
                >
                  Yes
                </button>
                <button
                  style={styles.modalButton}
                  onClick={() => handleHostPromptResponse(false)}
                  className="hover:bg-gray-100"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div style={styles.modal}>
            <div style={styles.backdrop}></div>
            <div style={styles.modalContent}>
              <h3 className="text-lg font-semibold mb-4">
                Your Event has been created successfully
              </h3>
              <button
                style={styles.successButton}
                onClick={() => {
                  /* Handle view event */
                }}
              >
                View Event
              </button>
              <br />
              <button
                style={styles.closeButton}
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create_Events;
