import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './eventlist.css'; 
import { fetchRegisteredEvents } from '../../components/store/slices/registeredevent';
import { fetchFavoriteEvents } from '../../components/store/slices/favouriteevents';
import { fetchRecentViews } from '../../components/store/slices/recentview';

const EventListOptions = () => {
  const [activeOption, setActiveOption] = useState('registered');
  const [hasToken, setHasToken] = useState(!!localStorage.getItem('authToken'));
  const dispatch = useDispatch();

  const registeredEvents = useSelector((state) => state.registeredEvents.events);
  const { data: favoriteEvents } = useSelector((state) => state.favorites);
  const { views: recentEvents } = useSelector((state) => state.recentViews);

  const eventsToDisplay =
    activeOption === 'registered'
      ? registeredEvents || []
      : activeOption === 'liked'
      ? favoriteEvents || []
      : recentEvents || [];

  useEffect(() => {
    const handleStorageChange = () => {
      setHasToken(!!localStorage.getItem('authToken'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (hasToken) {
      if (activeOption === 'registered') {
        dispatch(fetchRegisteredEvents());
      } else if (activeOption === 'liked') {
        dispatch(fetchFavoriteEvents());
      } else if (activeOption === 'recent') {
        dispatch(fetchRecentViews());
      }
    }
  }, [activeOption, dispatch, hasToken]);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const hasEvents =
    (registeredEvents && registeredEvents.length > 0) ||
    (favoriteEvents && favoriteEvents.length > 0) ||
    (recentEvents && recentEvents.length > 0);

  if (!hasToken || !hasEvents) {
    return null; 
  }

  return (
    <div id="eventlist">
      <div id="eventlist-options">
        <div
          className={`eventlist-options1 ${activeOption === 'registered' ? 'active' : ''}`}
          onClick={() => handleOptionClick('registered')}
        >
          <img src="/registered.svg" alt="Registered" />
          <div>Registered</div>
        </div>
        <div
          className={`eventlist-options1 ${activeOption === 'liked' ? 'active' : ''}`}
          onClick={() => handleOptionClick('liked')}
        >
          <img src="/liked.svg" alt="Liked" />
          <div>Liked</div>
        </div>
        <div
          className={`eventlist-options1 ${activeOption === 'recent' ? 'active' : ''}`}
          onClick={() => handleOptionClick('recent')}
        >
          <img src="/recent.svg" alt="Recent Views" />
          <div>Recent Views</div>
        </div>
      </div>
      <div className="event-list-cards">
        {eventsToDisplay.map((event) => (
          <div className="event-list-card" key={event.id}>
            <div className="event-list-card-upperpart">
              <img
                src={event.imageUrl || '/default-event.svg'}
                className="event-list-card-upperpart-image"
                alt={event.title}
              />
              <div className="event-list-card-upperpart-side2">
                <div className="event-list-card-upperpart-title">{event.title}</div>
                <div className="event-list-card-organization">{event.location}</div>
                <div className="event-list-card-regi-and-dead">
                  <div className="event-list-card-regi">
                    <div className="event-list-card-regi-head">Maximum Registration</div>
                    <div className="event-list-card-regi-num">{event.capacityMax}</div>
                  </div>
                  <div className="event-list-card-regi-dead">
                    <div className="event-list-card-dead-head">Deadline</div>
                    <div className="event-list-card-dead-num">
                      {new Date(event.registerEnd).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListOptions;
