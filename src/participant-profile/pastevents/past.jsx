import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchPastEvents } from '../../components/store/slices/pastevents';
import "./past.css";

const Pastevents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const { events: pastEvents, loading, error } = useSelector((state) => state.pastEvents);

  useEffect(() => {
    dispatch(fetchPastEvents());
  }, [dispatch]);

  const handleViewDetails = (id) => {
    // Redirect to /event with eventId in state
    navigate('/event', { state: { eventId: id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="past">
      <div id="past-event-head">Past Events</div>
      <div id="past-events-cards">
        {pastEvents.map((event) => (
          <article className="home-upcomimg-events-info" key={event.id}>
            <img
              className="home-upcomimg-events-info-image"
              src={event.imageUrl || '/default-event.svg'}
              alt={event.title}
              onClick={() => handleViewDetails(event.id)} // Navigate on image click
            />
            <div className="home-upcomimg-events-info-title">
              <h3 className="home-upcomimg-events-info-title1">{event.title}</h3>
              <div className="home-upcomimg-events-button-and-like">
                <button
                  className="home-upcomimg-events-button"
                  onClick={() => handleViewDetails(event.id)} // Navigate on button click
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

export default Pastevents;
