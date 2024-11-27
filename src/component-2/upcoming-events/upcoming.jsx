import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../../components/store/slices/listofevents'; 
import "./upcoming.css";

const Upcoming = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { events, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading events...</div>;
  }

  if (status === 'failed') {
    console.error("Error fetching events:", error);
    return <div>Error: Unable to fetch events. Please try again later.</div>;
  }

  if (!events || !Array.isArray(events)) {
    console.error("Invalid events data structure:", events);
    return <div>Error: Events data is not in the expected format.</div>;
  }

  if (events.length === 0) {
    return <div>No upcoming events at the moment. Stay tuned!</div>;
  }

  return (
    <div id="home-upcomimg-events-outer">
      <h2 id="home-upcomimg-events-head">Upcoming Events :</h2>
      <div id="home-upcomimg-events-content">
    
        <img className="home-upcomimg-events-arrow" src="/side2.svg" alt="Scroll Left" />

     
        {events.map((event) => (
          <article className="home-upcomimg-events-info" key={event.id}>
            <img
              className="home-upcomimg-events-info-image"
              src={event.imageUrl || '/default-event.svg'} 
              alt={event.title}
            />
            <div className="home-upcomimg-events-info-title">
              <h3 className="home-upcomimg-events-info-title1">{event.title}</h3>
              <p className="home-upcomimg-events-info-description">{event.description}</p>
              <div className="home-upcomimg-events-info-details">
                <span>Mode: {event.mode}</span>
                <span>Location: {event.location}</span>
              </div>
              <div className="home-upcomimg-events-button-and-like">
               
                <button
                  className="home-upcomimg-events-button"
                  onClick={() => navigate('/regifore')}
                >
                  Register Now
                </button>
                <img src="/like.svg" className="home-upcomimg-events-like" alt="Like" />
              </div>
            </div>
          </article>
        ))}

        <img className="home-upcomimg-events-arrow" src="/side.svg" alt="Scroll Right" />
      </div>
    </div>
  );
};

export default Upcoming;
