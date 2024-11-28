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
  const [currentPage, setCurrentPage] = useState(0); 
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1060); 

  const { events, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1060);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const eventsPerPage = isWideScreen ? 2 : 1; 
  const totalPages = Math.ceil(events.length / eventsPerPage);


  const displayedEvents = events.slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  );

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

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div id="home-upcomimg-events-outer">
      <h2 id="home-upcomimg-events-head">Upcoming Events :</h2>
      <div id="home-upcomimg-events-content">
        <img
          className="home-upcomimg-events-arrow"
          src="/side2.svg"
          alt="Scroll Left"
          onClick={goToPreviousPage}
        />

        {displayedEvents.map((event) => (
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
        <img
          className="home-upcomimg-events-arrow"
          src="/side.svg"
          alt="Scroll Right"
          onClick={goToNextPage}
        />
      </div>
    </div>
  );
};

export default Upcoming;
