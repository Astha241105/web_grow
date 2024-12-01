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
          <option value="offline">Offline</option>
          <option value="online">Online</option>
        </select></div>
        <div id="one-event-details">
      <div id="name-of-event-1">UX Hackathon</div>
      <div id="one-event-details1">
        <div id="institute">
          <img
            className="event-name-images-1"
            src="/institute2.svg"
            alt="college"
          />
          <div className="eventname-text-1">Ajay Kumar Garg Engineering College</div>
        </div>
        <div id="type-event">
          <img
            className="event-name-images-1"
            src="Offline2.svg"
            alt="event type"
          />
          <div className="eventname-text-1">Offline</div>
        </div>
        <div id="location">
          <img
            className="event-name-images-1"
            src="/updated.svg"
            alt="location"
          />
          <div id="event-details-updated-on">Updated on :</div>
          <div className="eventname-text-1">Ghaziabad, India</div>
        </div>
      </div>
      <div id="event-skill-0">
        Coding challenge
      </div>
      <div
        id="register-for-the-event"
        // onClick={handleRegisterClick}
        style={{ cursor: "pointer" }}
      >
        Register
      </div>
    </div>
    <div id="nav-card-event-page">
    <div  id="registered1"className='part-details-info-1'>
        <img className="part-details-img" src="/people.svg" alt="Registered Icon" />
        <div className="minor-details">
        <div  >Registered Candidates</div>
        <div>400</div></div>
      </div>
      <div id="team1" className='part-details-info-1'>
        <img className="part-details-img" src="/team.svg" alt="Team Size Icon" />
        <div  className="minor-details">
        <div>Team Size</div>
        <div>400</div></div>
      </div>
      <div id="deadline1" className='part-details-info-1'>
        <img className="part-details-img" src="/deadline.svg" alt="Deadline Icon" />
        <div className="minor-details">
        <div  >Deadline</div>
        <div>400</div></div>
      </div>
    </div>
    <div id="this-div-has-all-info">
     <div  className="this-div-has-all-info-parts">
        <div  className="this-div-has-all-info-heads">Introduction</div>
            <div className="this-div-has-all-info-info"></div>
        </div>
        <div  className="this-div-has-all-info-parts">
        <div  className="this-div-has-all-info-heads">Team & Eligibility</div>
            <div className="this-div-has-all-info-info"></div>
        </div>
        <div  className="this-div-has-all-info-parts">
        <div  className="this-div-has-all-info-heads">Timeline</div>
            <div className="this-div-has-all-info-info"></div>
        </div>
        <div  className="this-div-has-all-info-parts">
        <div  className="this-div-has-all-info-heads">Venue</div>
            <div className="this-div-has-all-info-info"></div>
        </div>
        <div  className="this-div-has-all-info-parts">
        <div  className="this-div-has-all-info-heads">Coins</div>
            <div className="this-div-has-all-info-info"></div>
        </div></div>
      </div>


      <div id="filtered-events">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="registered-event-card">
              <div className="registered-event-card-info">
                <img
                  className="registered-event-card-info-image"
                  src={event.imageUrl}
                  alt={`${event.title} Thumbnail`}
                />
                <div className="registered-event-card-info-details">
                  <div className="registered-event-card-info-title">{event.title}</div>
                  <div className="registered-event-card-info-category">{event.category}</div>
                  <div className="registered-event-card-info-mode">{event.mode}</div>
                </div>
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
