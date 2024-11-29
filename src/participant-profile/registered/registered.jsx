import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisteredEvents } from '../../components/store/slices/registeredevent';
import './registered.css';

const Registered = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.registeredEvents);

  useEffect(() => {
    dispatch(fetchRegisteredEvents()); // Fetch registered events when component mounts
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="registered-events-part">
      <div id="registered-events-part-head">Registrations/Applications</div>
      <div id="registered-events-cards">
        {events.length === 0 ? (
          <p>No registered events found.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="registered-event-card">
              <div className="registered-event-card-info">
                <img className="registered-event-card-info-image"src={event.imageUrl}></img>
                <div className="registered-event-card-info-details">
                  <div className="registered-event-card-info-title">{event.title}</div>
                  <div className="registered-event-card-info-category">{event.category}</div>
                  <div className="registered-event-card-info-mode">{event.mode}</div>
                </div>
              </div>
              <button className="registered-event-card-info-view-more">View Details</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Registered;
