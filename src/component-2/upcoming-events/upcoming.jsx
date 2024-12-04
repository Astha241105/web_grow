import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../../components/store/slices/listofevents';
import { fetchFavoriteEvents } from '../../components/store/slices/favouriteevents';
import { fetchEventsPublic } from '../../components/store/slices/publicevents';
import { addToFavorites } from '../../components/store/slices/addfavourite';
import { removeFavouriteEvent } from '../../components/store/slices/removefromfav'; 
import './upcoming.css';
import Loginpopup from "../login-popup/login-popup"

const Upcoming = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [eventsPerPage, setEventsPerPage] = useState(2);
  const authToken = localStorage.getItem("authToken");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  const isAuthenticated = !!authToken;

  const publicEventsState = useSelector((state) => state.publicEvents);
  console.log(publicEventsState)
  const privateEventsState = useSelector((state) => state.events);

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (isAuthenticated) {
            const eventsResponse = await dispatch(fetchEvents()).unwrap();
            const favoritesResponse = await dispatch(fetchFavoriteEvents()).unwrap();
            setEvents(eventsResponse);
            setFavoriteEvents(favoritesResponse.data || []);
          } else {
            const publicEventsResponse = await dispatch(fetchEventsPublic()).unwrap();
            setEvents(publicEventsResponse);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [dispatch, isAuthenticated]);

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

  const paginatedEvents = events.slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  );

  const handleRegisterClick = (eventId) => {
    if (!isAuthenticated) {
      setShowLoginPopup(true); 
    } else {
      setSelectedEventId(eventId);
      navigate('/regifore', { state: { eventId } });
    }
  };
  const handleFavoriteClick = (eventId) => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
    } else {
      if (favoriteEvents.includes(eventId)) {
        dispatch(removeFavouriteEvent({ eventId })); 
        setFavoriteEvents((prev) => prev.filter(id => id !== eventId)); 
      } else {
        dispatch(addToFavorites({ eventId })); 
        setFavoriteEvents((prev) => [...prev, eventId]); 
      }
    }
  };

  const handleImageClick = (eventId) => {
    navigate('/event', { state: { eventId } });
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(events.length / eventsPerPage) - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (status === 'failed') {
    console.error('Error fetching events:', error);
    return <div>Error: Unable to fetch events. Please try again later.</div>;
  }

  if (!events || !Array.isArray(events) || events.length === 0) {
    return null; 
  }


  return (
    <div id="home-upcomimg-events-outer">
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
    <div>{showLoginPopup && <Loginpopup onClose={() => setShowLoginPopup(false)} />}</div>
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
