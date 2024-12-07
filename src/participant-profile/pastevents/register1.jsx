import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchRegisteredEvents } from '../../components/store/slices/registeredevent';
import "./past.css";

const Registered1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const events = useSelector((state) => state.registeredEvents.events);

  useEffect(() => {
    dispatch(fetchRegisteredEvents());
  }, [dispatch]);

  const handleRegisterClick = (id) => {
    // Redirect to /event with eventId in state
    navigate('/event', { state: { eventId: id } });
  };

  const handleImageClick = (id) => {
    // Redirect to /event with eventId in state
    navigate('/event', { state: { eventId: id } });
  };

  return (
    <div id="past">
      <div id="past-event-head">Registered Events</div>
      <div id="past-events-cards">
        {events.map((event) => (
          <article className="home-upcomimg-events-info" key={event.id}>
            <img
              className="home-upcomimg-events-info-image"
              src={event.imageUrl || '/default-event.svg'}
              alt={event.title}
              onClick={() => handleImageClick(event.id)}
            />
            <div className="home-upcomimg-events-info-title">
              <h3 className="home-upcomimg-events-info-title1">{event.title}</h3>
              <div className="home-upcomimg-events-button-and-like">
                <button
                  className="home-upcomimg-events-button"
                  onClick={() => handleRegisterClick(event.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Registered1;
