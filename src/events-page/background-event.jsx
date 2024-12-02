import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchEventDetailsPublic } from '../components/store/slices/publiceventdetails'
import "./background-event.css"
import "./event-name/eventname.css"
import "./nav-event/navEvent.css"
import "./details/stages/stages.css"
import "./details/details.css"
import "./details/Dates/dates.css"

const BackgroundEvent = () => {
  const location = useLocation();
  const { eventId } = location.state || {}; 

  const dispatch = useDispatch();
  
  const { event, status, error } = useSelector((state) => state.eventDetailsPublic);

  useEffect(() => {
    if (eventId) {
      console.log('Registering for event ID:', eventId);
      dispatch(fetchEventDetailsPublic(eventId));
    }
  }, [dispatch, eventId]);

 
  if (status === 'loading') {
    return <div>Loading event details...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>No event details available</div>;
  }
  const lastUpdate = event.lastUpdate;

const date = new Date(lastUpdate);
const formattedDate = date.toLocaleDateString("en-US");

  return (
    <div id="background-event">
    <div id="background-event-all-details">
    <div id="for-content-and-image">
      <div id="eventname-back">
        <div id="name-of-event">{event.title}</div>
        <div id="institute">
          <img className="event-name-images" src="/college.svg" alt="college" />
          <div className="eventname-text">{event.host.organization}</div>
        </div>
        <div id="type-event">
          <img className="event-name-images" src="/eventtype.svg" alt="event type" />
          <div className="eventname-text">Technofest 2024</div>
        </div>
        <div id="location">
          <img className="event-name-images" src="/location.svg" alt="location" />
          <div className="eventname-text">Ghaziabad, India</div>
        </div>
        <div id="event-updatedon">
          <div id="event-updatedon-1">Updated on:&nbsp;</div>
          <div>{formattedDate}</div>
        </div>
        <div id="event-skill">{event.mode}</div>
      </div>
      <div>
        <img id="logo-of-event" src={`${event.imageUrl}`} alt="Event Logo" />
      </div>
    </div>
    {/* <div id="nav-event">
      <div className='nav-event-options'></div>
      <div className='nav-event-options'>Dates & Deadlines</div>
      <div className='nav-event-options'>Details</div>
      <div className='nav-event-options'>FAQs</div>
    </div> */}
    <div id="event-details">
    <div id="stages-and-timeline">
        <div id="stages-and-timeline-head">Stages and timeline</div>
        <div id="stages-and-timeline-content">
            <div id="stages-and-timeline-date">jjjjj</div>
            <div className="stages-and-timeline-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora et dolore, fugit aperiam officiis eaque id commodi in illo, pariatur corporis exercitationem vero adipisci ea, itaque non. Aliquam, maiores enim. Nobis similique vitae inventore illo exercitationem quidem repellendus quae sed enim provident ipsa, suscipit alias corrupti temporibus soluta eveniet ad labore pariatur tempore modi! Perspiciatis molestiae dolores fugit nisi, quibusdam vel exercitationem consequatur modi voluptate nostrum minus cum tempore!</div></div>
        </div>
        <div id="stages-and-timeline">
        <div  id="stages-and-timeline-head">Date and Deadline</div>
            <div className="stages-and-timeline-1"></div>
        </div>
    </div>
    </div>
    <div  id="background-event-all-details-participant"></div>
    </div>
  )
}

export default BackgroundEvent
