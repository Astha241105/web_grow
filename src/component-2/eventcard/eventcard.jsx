import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../components/store/slices/listofevents';
import './eventcard.css';

const Eventcard = () => {
  const dispatch = useDispatch();
  const { events, status, error } = useSelector((state) => state.events);

  useEffect(() => {
 
    dispatch(fetchEvents({ search: 'workshop', category: 'technology', location: 'NewYork' }));
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading events...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="event-list">
      {events.length > 0 ? (
        events.map((event) => (
          <div id="eventcard" key={event.id}>
            <h3 className="event-title">{event.name}</h3>
            <p className="event-date">Date: {event.date}</p>
            <p className="event-location">Location: {event.location}</p>
            <p className="event-category">Category: {event.category}</p>
            <p className="event-description">{event.description}</p>
          </div>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default Eventcard;
