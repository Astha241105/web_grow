import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPastEvents } from '../../components/store/slices/pastevents';
import "./past.css";

const Pastevents = () => {
  const dispatch = useDispatch();

  const { events: pastEvents, loading, error } = useSelector((state) => state.pastEvents);

  useEffect(() => {
    dispatch(fetchPastEvents());
  }, [dispatch]);

  const handleRegisterClick = (id) => {
    console.log(`Register for event with id: ${id}`);
  };

  const handleImageClick = (id) => {
    console.log(`Navigate to event details for id: ${id}`);
    // Add navigation logic here
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

export default Pastevents;
