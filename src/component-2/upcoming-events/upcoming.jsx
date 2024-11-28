import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../../components/store/slices/listofevents';
import { addToFavorites } from '../../components/store/slices/addfavourite'; 
import './upcoming.css';

const Upcoming = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [favorites, setFavorites] = useState([]); 

  const { events, status, error } = useSelector((state) => state.events);
  const { status: favoriteStatus, error: favoriteError } = useSelector(
    (state) => state.addToFavorites
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading events...</div>;
  }

  if (status === 'failed') {
    console.error('Error fetching events:', error);
    return <div>Error: Unable to fetch events. Please try again later.</div>;
  }

  if (!events || !Array.isArray(events)) {
    console.error('Invalid events data structure:', events);
    return <div>Error: Events data is not in the expected format.</div>;
  }

  if (events.length === 0) {
    return <div>No upcoming events at the moment. Stay tuned!</div>;
  }

  const handleRegisterClick = (eventId) => {
    setSelectedEventId(eventId);
    navigate('/regifore', { state: { eventId } });
  };

  const handleFavoriteClick = (eventId) => {
    if (favorites.includes(eventId)) {

      setFavorites(favorites.filter((id) => id !== eventId));
    } else {
      setFavorites([...favorites, eventId]);
      dispatch(addToFavorites({ eventId })); 
    }
  };

  const scrollLeft = () => {
    if (contentRef.current) {
      contentRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (contentRef.current) {
      contentRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div id="home-upcomimg-events-outer">
      <h2 id="home-upcomimg-events-head">Upcoming Events :</h2>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <img
          className="home-upcomimg-events-arrow"
          src="/side2.svg"
          alt="Scroll Left"
          onClick={scrollLeft}
        />

        <div id="home-upcomimg-events-content" ref={contentRef}>
          {events.map((event) => (
            <article className="home-upcomimg-events-info" key={event.id}>
              <img
                className="home-upcomimg-events-info-image"
                src={event.imageUrl || '/default-event.svg'}
                alt={event.title}
              />
              <div className="home-upcomimg-events-info-title">
                <h3 className="home-upcomimg-events-info-title1">{event.title}</h3>

                <div className="home-upcomimg-events-button-and-like">
                  <button
                    className="home-upcomimg-events-button"
                    onClick={() => handleRegisterClick(event.id)}
                  >
                    Register Now
                  </button>
                  <img
                    src={favorites.includes(event.id) ? '/liked2.svg' : '/like.svg'} 
                    className="home-upcomimg-events-like"
                    alt="Like"
                    onClick={() => handleFavoriteClick(event.id)}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <img
          className="home-upcomimg-events-arrow"
          src="/side.svg"
          alt="Scroll Right"
          onClick={scrollRight}
        />
      </div>
    </div>
  );
};

export default Upcoming;
