import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './eventlist.css'; 
import { fetchRegisteredEvents } from '../../components/store/slices/registeredevent';
import { fetchFavoriteEvents } from '../../components/store/slices/favouriteevents';

const EventListOptions = () => {
  const [activeOption, setActiveOption] = useState('registered');
  const [hasToken, setHasToken] = useState(!!localStorage.getItem('authToken'));
  const dispatch = useDispatch();

  const registeredEvents = useSelector((state) => state.registeredEvents.events);
  const { data: favoriteEvents } = useSelector((state) => state.favorites);

  const eventsToDisplay = activeOption === 'registered' ? registeredEvents || [] : favoriteEvents || [];
  useEffect(() => {
    const handleStorageChange = () => {
      setHasToken(!!localStorage.getItem('token'));
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
      }
    }
  }, [activeOption, dispatch, hasToken]);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  if (!hasToken) {
    return <div></div>;
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
      </div>
      <div className="event-list-cards">
        {eventsToDisplay.map((event) => (
          <div className="event-list-card" key={event.id}>
            <div className="event-list-card-upperpart">
              <img src={event.imageUrl || '/default-event.svg'} className="event-list-card-upperpart-image" alt={event.title} />
              <div className="event-list-card-upperpart-side2">
                <div className="event-list-card-upperpart-title">{event.title}</div>
                <div className="event-list-card-organization">Organization Name</div>
                <div className="event-list-card-regi-and-dead">
                  <div className="event-list-card-regi">
                    <div className="event-list-card-regi-head">Maximum Registration</div>
                    <div className="event-list-card-regi-num">400</div>
                  </div>
                  <div className="event-list-card-regi-dead">
                    <div className="event-list-card-dead-head">Deadline</div>
                    <div className="event-list-card-dead-num">12-12-2024</div>
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
