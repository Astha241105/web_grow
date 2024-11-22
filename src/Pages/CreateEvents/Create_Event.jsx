import React from "react";

const Create_Events = () => {
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
      <div className="ce-gradient"> </div>
      <div className="ce-gradient2"></div>
      <div className="ce-form">
        <div className="ce-progress-bar">
          <div className="ce-back-button">
            <img src="/back-btn.svg" className="ce-bbtn"></img>
            <button className="ce-black">Back</button>
          </div>
          <div className="steps">
            <div className="step unactive">
              <img src="1.svg"></img>
              Basic Details
            </div>
            <div className="step-divider">
              <img src="Line.svg"></img>
            </div>
            <div className="step1">
              <img src="2.svg"></img>
              Registration Details
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="ce-form-content">
          <div className="ce-form-group">
            <label>Participation Type</label>
            <div className="ce-button-group">
              <button className="option-button">
                <img src="Globe.svg"></img>
                <div>
                  <div className="button-title">Individual</div>
                </div>
              </button>
              <button className="option-button">
                <img src="Globe.svg"></img>
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
            <label>Number of Registrations allowed (optional)</label>

            <input type="number" placeholder="Enter count" />
          </div>

          <div className="ce-form-actions">
            <button className="ce-next-button">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_Events;
