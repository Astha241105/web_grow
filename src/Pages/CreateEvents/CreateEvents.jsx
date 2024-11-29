import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  uploadEventImage,
  setEventData,
} from "../../components/store/slices/create_event_Slice";
import { updateEventApi } from "../../components/store/slices/updateeventSlice";
import "./CreateEvents.css";

const CreateEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isUpdateMode = location.state?.isUpdateMode || false;
  const existingEventData =
    location.state?.eventData ||
    useSelector((state) => state.createEvent.eventData);

  const imageUrl = useSelector((state) =>
    isUpdateMode
      ? state.updateEvent.imageUrl || existingEventData.imageUrl
      : state.createEvent.imageUrl
  );

  const loading = useSelector((state) =>
    isUpdateMode ? state.updateEvent.loading : state.createEvent.loading
  );

  const error = useSelector((state) =>
    isUpdateMode ? state.updateEvent.error : state.createEvent.error
  );

  const [formData, setFormData] = useState({
    opportunityType: existingEventData?.opportunityType || "",
    visibility: existingEventData?.visibility || "",
    opportunityTitle: existingEventData?.opportunityTitle || "",
    organization: existingEventData?.organization || "",
    websiteUrl: existingEventData?.websiteUrl || "https://",
    festival: existingEventData?.festival || "",
    eventMode: existingEventData?.eventMode || "",
    aboutOpportunity: existingEventData?.aboutOpportunity || "",
    eventId: existingEventData?.eventId || null,
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
        await dispatch(uploadEventImage(file)).unwrap();
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isEditable, setIsEditable] = useState(false);

  const handleNextStep = () => {
    const eventDataToDispatch = {
      ...formData,
      imageUrl: imageUrl || null,
    };

    if (isUpdateMode) {
      const updatePayload = {
        ...eventDataToDispatch,
        eventId: formData.eventId,
      };

      dispatch(updateEventApi(updatePayload))
        .then((response) => {
          if (response.payload) {
            navigate("/create-event1", {
              state: {
                isUpdateMode: true,
                eventData: response.payload,
              },
            });
          }
        })
        .catch((error) => {
          console.error("Update failed", error);
        });
    } else {
      dispatch(setEventData(eventDataToDispatch));
      navigate("/create-event1");
    }
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
                disabled={loading}
              />
              <div className="logo-placeholder">
                {loading
                  ? "Uploading..."
                  : imageUrl
                  ? "Logo Uploaded"
                  : "Upload Logo"}
              </div>
              {error && <div className="text-red-500">{error}</div>}
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
            <label>About Opportunity*</label>
            <textarea
              className="ce-guidelines"
              name="aboutOpportunity"
              disabled={!isEditable}
              value={formData.aboutOpportunity}
              onChange={handleInputChange}
              placeholder="This field helps you to mention the details of the opportunity you are listing. It is better to include Rules, Eligibility, Process, Format, etc., in order to get the opportunity approved. The more details, the better!

Guidelines:
Mention all the guidelines like eligibility, format, etc.
Inter-college team members allowed or not.
Inter-specialization team members allowed or not.
The number of questions/ problem statements.
Duration of the rounds.

Rules:
Mention the rules of the competition."
            ></textarea>
            <div
              className="ce-edit"
              onClick={() => setIsEditable((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              <img src="Edit.svg" alt="Edit Icon" />
              {isEditable ? "Lock" : "Edit"}
            </div>
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
      </div>
    </div>
  );
};

export default CreateEvents;
