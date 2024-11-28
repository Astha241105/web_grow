import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../components/store/slices/listofevents';
import { fetchEventDetails } from '../../components/store/slices/eventdetails'; 
import './filter.css';

const EventType = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null); 

  const { events } = useSelector((state) => state.events);
  const { eventDetails } = useSelector((state) => state.eventDetails); 

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filteredEvents = events.filter((event) => {
    const categoryMatch = selectedCategory ? event.category === selectedCategory : true;
    const typeMatch = selectedType ? event.type === selectedType : true;
    return categoryMatch && typeMatch;
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleEventClick = (eventId) => {
    dispatch(fetchEventDetails(eventId));
    setSelectedEvent(eventId); 
  };

  return (
    <div id="filter-by">
      <div id="filter-by-1">
        <div id="select-it">
          <select
            id="dropdown-event"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="quiz">Quizzes</option>
            <option value="hackathon">Hackathons</option>
            <option value="webinar">Webinars</option>
            <option value="seminar">Seminars</option>
          </select>
          <select
            id="dropdown-event"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="">All Types</option>
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>

      <div id="filtered-events">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="event-card"
              onClick={() => handleEventClick(event.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={event.imageUrl || '/default-event.svg'}
                alt={event.title}
                className="event-card-image"
              />
              <div className="event-card-details">
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-date">
                  Registration Ends: {new Date(event.registrationEndDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No events match your selection.</p>
        )}
      </div>

      {selectedEvent && eventDetails && (
        <div id="this-div-has-all-info">
          <div className="this-div-has-all-info-parts">
            <div className="this-div-has-all-info-heads">Introduction</div>
            <div className="this-div-has-all-info-info">{eventDetails.introduction}</div>
          </div>
          <div className="this-div-has-all-info-parts">
            <div className="this-div-has-all-info-heads">Team & Eligibility</div>
            <div className="this-div-has-all-info-info">{eventDetails.teamAndEligibility}</div>
          </div>
          <div className="this-div-has-all-info-parts">
            <div className="this-div-has-all-info-heads">Timeline</div>
            <div className="this-div-has-all-info-info">{eventDetails.timeline}</div>
          </div>
          <div className="this-div-has-all-info-parts">
            <div className="this-div-has-all-info-heads">Venue</div>
            <div className="this-div-has-all-info-info">{eventDetails.venue}</div>
          </div>
          <div className="this-div-has-all-info-parts">
            <div className="this-div-has-all-info-heads">Coins</div>
            <div className="this-div-has-all-info-info">{eventDetails.coins}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventType;
