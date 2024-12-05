import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchEventDetailsPublic } from "../../components/store/slices/publiceventdetails";
import "./nav-register.css";

const Navregister = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { event, status, error } = useSelector((state) => state.eventDetailsPublic);
  console.log(event,"yes")
  useEffect(() => {
    const { eventId } = location.state || {}; // Extract eventId from state
    if (eventId) {
      dispatch(fetchEventDetailsPublic(eventId)); // Dispatch the action with eventId
    }
  }, [location.state, dispatch]);

  // Conditional rendering to avoid accessing properties of null
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error || "Failed to load event details."}</div>;
  }

  return (
    <div id="teampage-nav">
      <div id="teampage-nav-back">
        <img src="/back2.svg" alt="Back" />
        <span id="teampage-nav-back1">Back</span>
      </div>
      {event ? (
        <>
          {event.imageUrl ? (
            <img src={event.imageUrl} id="teampage-nav-logo" alt="Event Logo" />
          ) : (
            <div id="teampage-nav-logo-placeholder">No Image Available</div>
          )}
          <div id="teampage-nav-name-and-location">
            <div id="teampage-nav-name">{event.title || "Event Title"}</div>
            <div id="teampage-nav-location">
              {event.host?.organization || "Unknown Organization"}
            </div>
          </div>
        </>
      ) : (
        <div>No event details available.</div>
      )}
    </div>
  );
};

export default Navregister;
