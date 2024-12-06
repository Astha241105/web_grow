import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToFavorites } from '../../components/store/slices/addfavourite';
import { removeFavouriteEvent } from '../../components/store/slices/removefromfav';
import { fetchFavoriteEvents } from '../../components/store/slices/favouriteevents';
import './upcoming.css';
import Loginpopup from '../login-popup/login-popup';

const Upcoming = ({ events, status }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [eventsPerPage, setEventsPerPage] = useState(2);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const authToken = localStorage.getItem('authToken');
  const isAuthenticated = !!authToken;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setEventsPerPage(width <= 1060 ? 1 : 2);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuthenticated) {
        try {
          const favoritesResponse = await dispatch(fetchFavoriteEvents()).unwrap();
          setFavoriteEvents(favoritesResponse.map(event => event.id) || []);
        } catch (error) {
          console.error('Error fetching favorite events:', error);
          setFavoriteEvents([]);
        }
      }
    };
    fetchFavorites();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    console.log('Favorite events:', favoriteEvents);
  }, [favoriteEvents]);

  const paginatedEvents = events.slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage);

  const handleRegisterClick = (eventId) => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
    } else {
      navigate('/regifore', { state: { eventId } });
    }
  };

  const handleFavoriteClick = async (eventId) => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
    } else {
      if (favoriteEvents.includes(eventId)) {
        await dispatch(removeFavouriteEvent({ eventId }));
        setFavoriteEvents(prev => prev.filter(id => id !== eventId));
      } else {
        await dispatch(addToFavorites({ eventId }));
        setFavoriteEvents(prev => [...prev, eventId]);
      }
    }
  };

  const handleImageClick = (eventId) => {
    navigate('/event', { state: { eventId } });
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(events.length / eventsPerPage) - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (status === 'failed') {
    console.error('Error fetching events');
    return <div></div>;
  }

  if (!events || !Array.isArray(events) || events.length === 0) {
    return null;
  }

  return (
    <div id="home-upcomimg-events-outer">
      <div>{showLoginPopup && <Loginpopup onClose={() => setShowLoginPopup(false)} />}</div>
      <h2 id="home-upcomimg-events-head">Upcoming Events :</h2>
      <div id="home-upcomimg-events-content">
        <img
          className="home-upcomimg-events-arrow"
          src="/side2.svg"
          alt="Scroll Left"
          onClick={currentPage > 0 ? goToPreviousPage : null}
          style={{
            cursor: currentPage > 0 ? 'pointer' : 'not-allowed',
            opacity: currentPage > 0 ? 1 : 0.5,
          }}
        />

        {paginatedEvents.map((event) => (
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
                  Register Now
                </button>
                <img
                  src={favoriteEvents.includes(event.id) ? '/liked2.svg' : '/like.svg'}
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
          onClick={events.length > (currentPage + 1) * eventsPerPage ? goToNextPage : null}
          style={{
            cursor: events.length > (currentPage + 1) * eventsPerPage ? 'pointer' : 'not-allowed',
            opacity: events.length > (currentPage + 1) * eventsPerPage ? 1 : 0.5,
          }}
        />
      </div>
    </div>
  );
};

export default Upcoming;
