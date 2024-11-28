import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  uploadImage,
  setBasicDetails,
} from "../../store/slices/create_event_Slice";
import "./CreateEvents.css";

const CreateEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    imageUrl = "",
    opportunityType,
    visibility,
    opportunityTitle,
    organization,
    websiteUrl,
    festival,
    eventMode,
    category,
    skills,
    aboutOpportunity,
  } = useSelector((state) => state.createEvent || {});

  const [formData, setFormData] = useState({
    opportunityType,
    visibility,
    opportunityTitle,
    organization,
    websiteUrl: websiteUrl || "https://",
    festival,
    eventMode,
    category,
    skills,
    aboutOpportunity,
  });

  const urlInputRef = useRef(null);

  const handleUrlFocus = () => {
    if (urlInputRef.current) {
      const length = urlInputRef.current.value.length;
      urlInputRef.current.setSelectionRange(length, length);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await dispatch(uploadImage(file)).unwrap();
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    dispatch(setBasicDetails(formData));
    navigate("/create-event1");
  };

  return (
    <div className="ce">
      <div className="ce-gradient z-[-1]"> </div>
      <div className="ce-gradient2 z-[-1]"></div>
      <div className="ce-form">
        <div className="ce-progress-bar">
          <div className="ce-back-button">
            <img src="/back-btn.svg" className="ce-bbtn" alt="Back" />
            <button className="ce-black">Back</button>
          </div>
          <div className="steps">
            <div className="step active">
              <img src="1.svg" alt="Step 1" />
              Basic Details
            </div>
            <div className="step-divider">
              <img src="Line.svg" alt="Divider" />
            </div>
            <div className="step">
              <img src="2.svg" alt="Step 2" />
              Registration Details
            </div>
          </div>
        </div>
        <hr />
        <div className="ce-form-content">
          <h1 className="bd-head">Basic Details</h1>
          <div className="ce-form-group">
            <label>Opportunity Logo</label>
            <div className="logo-upload">
              <input
                type="file"
                name="opportunityLogo"
                onChange={handleImageUpload}
                accept="image/*"
              />
              <div className="logo-placeholder">
                {imageUrl ? "Logo Uploaded" : "Upload Logo"}
              </div>
            </div>
          </div>

          <div className="ce-form-group">
            <label>Opportunity Type</label>
            <select
              name="opportunityType"
              value={formData.opportunityType}
              onChange={handleInputChange}
            >
              <option value="">Select opportunity type</option>
              <option value="Seminar">Seminar</option>
              <option value="Webinar">Webinar</option>
              <option value="Quiz">Quiz</option>
              <option value="Hackathon">Hackathon</option>
            </select>
          </div>

          <div className="ce-form-group">
            <label>Visibility*</label>
            <div className="ce-button-group">
              <button
                className={`option-button ${
                  formData.visibility === "public" ? "active" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, visibility: "public" }))
                }
              >
                <img src="Globe.svg" alt="Public" />
                <div>
                  <div className="button-title">Open publicly</div>
                  <div className="button-subtitle">
                    Will be visible to all webgrow users
                  </div>
                </div>
              </button>
              <button
                className={`option-button ${
                  formData.visibility === "private" ? "active" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, visibility: "private" }))
                }
              >
                <img src="Globe.svg" alt="Private" />
                <div>
                  <div className="button-title">Invite Only</div>
                  <div className="button-subtitle">
                    Will be accessible only via link
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="ce-form-group">
            <label>Opportunity Title*</label>
            <input
              type="text"
              name="opportunityTitle"
              value={formData.opportunityTitle}
              onChange={handleInputChange}
              placeholder="Enter opportunity title"
            />
          </div>

          <div className="ce-form-group">
            <label>Enter Your Organisation*</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
            />
          </div>

          <div className="ce-form-group">
            <label>Website URL</label>
            <p className="ce-help-text">
              The URL can be your organization's website or an
              opportunity-related URL.
            </p>
            <input
              type="text"
              name="websiteUrl"
              ref={urlInputRef}
              value={formData.websiteUrl}
              onChange={handleInputChange}
              onFocus={handleUrlFocus}
            />
          </div>

          <div className="ce-form-group">
            <label>Festival (optional)</label>
            <input
              type="text"
              name="festival"
              value={formData.festival}
              onChange={handleInputChange}
              placeholder="Enter festival name"
            />
          </div>

          <div className="ce-form-group">
            <label>Mode of Event*</label>
            <div className="ce-button-group">
              <button
                className={`option-button ${
                  formData.eventMode === "online" ? "active" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, eventMode: "online" }))
                }
              >
                <img src="/Online.svg" alt="Online Mode" />
                <span>Online Mode</span>
              </button>
              <button
                className={`option-button ${
                  formData.eventMode === "offline" ? "active" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, eventMode: "offline" }))
                }
              >
                <img src="/Offline.svg" alt="Offline Mode" />
                <span>Offline Mode</span>
              </button>
            </div>
          </div>

          <div className="ce-form-group">
            <label>Categories</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Choose category</option>
            </select>
          </div>

          <div className="ce-form-group">
            <label>Skill to be Accessed</label>
            <select
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
            >
              <option value="">Search Skills</option>
            </select>
          </div>

          <div className="ce-form-group">
            <label>About Opportunity*</label>
            <div className="ce-guidelines">
              <div className="ce-edit">
                <img src="Edit.svg"></img>Edit
              </div>
              <p>Guidelines:</p>
              <ul>
                <li>
                  Mention all the guidelines like eligibility, format, etc.
                </li>
                <li>Inter-college team members allowed or not.</li>
                <li>Inter-specialization team members allowed or not.</li>
                <li>The number of questions/problem statements.</li>
                <li>Duration of the rounds.</li>
              </ul>
              <p>Rules:</p>
              <ul>
                <li>Mention the rules of the competition.</li>
              </ul>
            </div>
          </div>

          <div className="ce-form-actions">
            <button className="ce-next-button" onClick={handleNextStep}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvents;
