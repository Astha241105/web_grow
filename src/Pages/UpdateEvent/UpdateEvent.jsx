import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  uploadEventImage,
  updateEventApi,
  setUpdateEventData,
  fetchEventDetails,
} from "../../components/store/slices/updateeventSlice";

const Update_event = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { imageUrl, loading, error, eventDetails } = useSelector(
    (state) => state.updateEvent
  );
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    eventId: "",
    opportunityType: "",
    visibility: "",
    opportunityTitle: "",
    organization: "",
    websiteUrl: "https://",
    festival: "",
    eventMode: "",
    aboutOpportunity: "",
    imageFile: null,
  });

  useEffect(() => {
    const eventId = location.state?.eventId;

    if (eventId) {
      dispatch(fetchEventDetails(eventId));
    }
  }, [dispatch, location.state]);

  useEffect(() => {
    const eventData = location.state?.eventData;
    if (eventData) {
      setFormData((prevData) => ({
        ...prevData,
        eventId: eventData.id,
        opportunityType: eventData.opportunityType || "",
        visibility: eventData.visibility || "",
        opportunityTitle: eventData.title || "",
        organization: eventData.organization || "",
        websiteUrl: eventData.websiteUrl || "https://",
        festival: eventData.festival || "",
        eventMode: eventData.mode || "",
        aboutOpportunity: eventData.description || "",
      }));
    }
  }, [location.state]);

  const [isEditable, setIsEditable] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));

      try {
        const resultAction = await dispatch(uploadEventImage(file));
        if (uploadEventImage.fulfilled.match(resultAction)) {
          setFormData((prev) => ({ ...prev, imageUrl: resultAction.payload }));
        }
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  const handleNext = () => {
    const requiredFields = [
      "opportunityType",
      "visibility",
      "opportunityTitle",
      "organization",
      "eventMode",
      "aboutOpportunity",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    dispatch(
      setUpdateEventData({
        eventId: formData.eventId,
        opportunityType: formData.opportunityType,
        visibility: formData.visibility,
        opportunityTitle: formData.opportunityTitle,
        organization: formData.organization,
        websiteUrl: formData.websiteUrl,
        festival: formData.festival,
        eventMode: formData.eventMode,
        aboutOpportunity: formData.aboutOpportunity,
        imageUrl: imageUrl || formData.imageUrl,
      })
    );

    navigate("/update-event_1", {
      state: {
        eventId: formData.eventId,
      },
    });
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
                ref={fileInputRef}
                name="opportunityLogo"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <div
                className="logo-placeholder"
                onClick={() => fileInputRef.current.click()}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded Logo"
                    className="uploaded-logo"
                  />
                ) : (
                  "Upload Logo"
                )}
              </div>
              {loading && <p>Uploading...</p>}
              {error && <p className="error">Upload failed: {error}</p>}
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
            <input
              type="text"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleInputChange}
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
              placeholder="Enter details here"
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
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? "Processing..." : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update_event;
