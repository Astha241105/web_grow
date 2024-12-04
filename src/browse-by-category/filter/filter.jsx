import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,useNavigate} from 'react-router-dom';
import { fetchEventsPublic } from '../../components/store/slices/publicevents';
import { fetchEventDetailsPublic } from '../../components/store/slices/publiceventdetails';
import Loginpopup from '../../component-2/login-popup/login-popup'; 
import './filter.css';

const EventType = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate=useNavigate()

  const { events } = useSelector((state) => state.publicEvents);
  console.log(events)
  const { event, status, error } = useSelector((state) => state.eventDetailsPublic);

  useEffect(() => {
    dispatch(fetchEventsPublic());
  }, [dispatch]);

  useEffect(() => {
    if (events.length > 0 && !selectedEvent) {
      dispatch(fetchEventDetailsPublic(events[0].id));
      setSelectedEvent(events[0].id);
    }
  }, [events, selectedEvent, dispatch]);

  const filteredEvents = events.filter((event) => {
    const categoryMatch = selectedCategory
      ? event.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return categoryMatch;
  });
  
  const handleRegisterClick = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/regifore', { state: { eventId: selectedEvent } });
    } else {
      setShowLoginPopup(true);
    }
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleEventClick = (eventId) => {
    setSelectedEvent(eventId);
    dispatch(fetchEventDetailsPublic(eventId));
  };
  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);
  const handleOneEventDetailsClick = () => {
    if (window.innerWidth < 920) {
      navigate('/event', { state: { eventId: selectedEvent } });
    }
  };


const lastUpdate = event && event.lastUpdate ? new Date(event.lastUpdate).toLocaleDateString('en-US') : '';
const registerStart = event && event.registerStart ? new Date(event.registerStart).toLocaleDateString('en-US') : '';
const registerEnd = event && event.registerEnd ? new Date(event.registerEnd).toLocaleDateString('en-US') : '';
const formattedDatestart =event && event.startTime ? new Date(event.startTime).toLocaleDateString('en-US') : '';
const formattedTimestart = event && event.startTime ? new Date(event.startTime).toLocaleTimeString('en-US'):'';
const formattedDateend =event && event.endTime ? new Date(event.endTime).toLocaleDateString('en-US') : '';
const formattedTimeend = event && event.endTime ? new Date(event.endTime).toLocaleTimeString('en-US'):'';

  function capitalizeFirstLetter(sentence) {
    if (!sentence) return '';
    return sentence
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

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
        </div>

          {status === 'loading' && <div></div>}
          {status === 'failed' && <div>Error loading event details</div>}
          {status === 'succeeded' && event && (
            <>
<div id="one-event-details" onClick={handleOneEventDetailsClick}>
  <div id="one-event-details-image-and-info">
  <div id="name-of-event-1">{event.title}</div>
  <div id="one-event-details1">
    <div id="institute">
      <img
        className="event-name-images-1"
        src="/institute2.svg"
        alt="college"
      />
      <div className="eventname-text-1">{capitalizeFirstLetter(event.host.organization)}</div>
    </div>
    <div id="type-event">
      <img
        className="event-name-images-1"
        src="Offline2.svg"
        alt="event type"
      />
      <div className="eventname-text-1">{capitalizeFirstLetter(event.mode)}</div>
    </div>
    <div id="location">
      <img
        className="event-name-images-1"
        src="/updated.svg"
        alt="location"
      />
      <div id="event-details-updated-on">Updated on :</div>
      <div className="eventname-text-1">{lastUpdate}</div>
    </div>
  </div>
  <img id="one-event-details-image"src={`${event.imageUrl}`}></img></div>
  <div id="event-skill-0">
    {capitalizeFirstLetter(event.category)}
  </div>
  <div
        id="register-for-the-event"
        onClick={handleRegisterClick}
        style={{ cursor: "pointer" }}
      >
        Register
      </div>
      <div>
      {showLoginPopup && <Loginpopup onClose={() => setShowLoginPopup(false)} />}
    </div>
</div>

<div id="nav-card-event-page">
  <div id="registered1" className="part-details-info-1">
    <img className="part-details-img" src="/people.svg" alt="Registered Icon" />
    <div className="minor-details">
      <div>Maximum Registerations</div>
      <div>{event.capacityMax}</div>
    </div>
  </div>

  {event.teamCreationAllowed ? (
    <div id="team1" className="part-details-info-1">
      <img className="part-details-img" src="/team.svg" alt="Team Size Icon" />
      <div className="minor-details">
        <div>Team Size</div>
        <div>{event.maxTeamSize ? event.maxTeamSize : 'N/A'}</div>
      </div>
    </div>
  ) : (
    <div id="individual-participation" className="part-details-info-1">
      <img className="part-details-img" src="/team.svg" alt="Individual Participation Icon" />
      <div className="minor-details">
        <div>Participation</div>
        <div>Individual participation.</div>
      </div>
    </div>
  )}

<div id="deadline1" className="part-details-info-1">
  <img className="part-details-img" src="/deadline.svg" alt="Deadline Icon" />
  <div className="minor-details">
    <div>Deadline</div>
    <div>
      {registerEnd ? (
        new Date(registerEnd).toLocaleDateString('en-US')
      ) : (
        'N/A'
      )}
    </div>
  </div>
</div>
</div>

<div id="event-details-updated-on">Updated on:</div>
<div className="eventname-text-1">{event.location}</div>


          </>

          )}
          <div id="event-details111">
          {event?.timelineEntries?.length > 0 && (
  <div id="stages-and-timeline">
    <div id="stages-and-timeline-head">Stages and timeline</div>
    <div id="stages-and-timeline-content">
      {event.timelineEntries
        .filter((entry) => entry) 
        .map((entry, index) => (
          <div className="stages-and-timeline-1" key={index}>
            <div>
              <div className="stages-and-timeline-1-head">{`Day ${entry.day}`}</div>
              <div className="stages-and-timeline-1-content">{entry.description}</div>
            </div>
          </div>
        ))}
    </div>
  </div>
)}

          <div id="stages-and-timeline">
            <div id="stages-and-timeline-head">Date and Deadline</div>
            <div id="stages-and-timeline-content">
              <div className="stages-and-timeline-1">
                <div>
                  <div className="stages-and-timeline-1-head">
                    Registration Start from:
                  </div>
                  <div className="stages-and-timeline-1-content">
                    {registerStart}
                  </div>
                </div>
                <div>
                  <div className="stages-and-timeline-1-head">
                    Registration Ends on:
                  </div>
                  <div className="stages-and-timeline-1-content">
                    {registerEnd}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="stages-and-timeline">
            <div id="stages-and-timeline-head">Details</div>
            <div id="stages-and-timeline-content">
              <div className="stages-and-timeline-1">
                <div>
                  <div className="stages-and-timeline-1-head">Introduction</div>
                  <div className="stages-and-timeline-1-content">{event?.description}</div>
                </div>
                <div>
                  <div className="stages-and-timeline-1-head">Team and Eligibility</div>
                  <div className="stages-and-timeline-1-content">
                    {event?.maxTeamSize
                      ? `Team of minimum ${event?.maxTeamSize} and maximum ${event?.maxTeamSize} is allowed.`
                      : 'Individual participation is allowed.'}
                  </div>
                </div>
                <div>
                  {(event?.location || event?.url) && (
                    <div>
                      <div className="stages-and-timeline-1-head">
                        {event?.location ? 'Venue' : 'URL'}
                      </div>
                      <div className="stages-and-timeline-1-content">
                        {event.location
                          ? capitalizeFirstLetter(event.location)
                          : event.url}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="stages-and-timeline-1-head">Timeline</div>
                  <div className="stages-and-timeline-1-content">
                    Event Start from: {formattedDatestart} {formattedTimestart}
                    <br />
                    Event Ends on: {formattedDateend} {formattedTimeend}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="organizer-details111">
          <div id="stages-and-timeline-head">Organizers</div>
          <div id="stages-and-timeline-content">
            <div className="stages-and-timeline-1">
              {event?.host && (
                <div className="organizer-details-blocks">
                  <img
                    className="organizer-details-blocks-image"
                    src={`${event?.host?.imageUrl}`}
                    alt=""
                  />
                  <div>
                    <div className="organizer-details-blocks-text-1">
                      {event.host.firstName} {event.host.lastName}
                    </div>
                    <div className="organizer-details-blocks-text-2">{event.host.email}</div>
                  </div>
                </div>
              )}

              {event?.administrators && event?.administrators?.length > 0 && (
                <div>
                  {event.administrators.map((admin, index) => (
                    <div className="organizer-details-blocks" key={index}>
                      <img
                        className="organizer-details-blocks-image"
                        src={`${admin.imageUrl}`}
                        alt=""
                      />
                      <div>
                        <div className="organizer-details-blocks-text-1">
                          {admin.firstName} {admin.lastName}
                        </div>
                        <div className="organizer-details-blocks-text-2">
                          {admin.username}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div> */}
          {/* </div>
        </div> */}
        </div>
      {/* </div> */}

      <div id="filtered-events">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="registered-event-card"
              onClick={() => handleEventClick(event.id)}
            >
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
    </div>
  );
};

export default EventType;
