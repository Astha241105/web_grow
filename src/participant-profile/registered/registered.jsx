import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRegisteredEvents } from '../../components/store/slices/registeredevent';
import { fetchQuizStatus } from '../../components/store/slices/quizprogress';
import './registered.css';

const Registered = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { events, loading, error } = useSelector((state) => state.registeredEvents);
  const { status, loading: statusLoading, error: statusError } = useSelector((state) => state.quizStatus);

  useEffect(() => {
    dispatch(fetchRegisteredEvents());
  }, [dispatch]);

  const handleViewDetails = (quizId) => {
    dispatch(fetchQuizStatus({ quizId })).then((result) => {
      if (result.payload) {
        const { totalQuestions } = result.payload;
        navigate('/quiz', {
          state: { totalQuestions,quizId}, 
        });
      }
    });
  };

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>Error loading registered events </div>;
  }

  return (
    <div id="registered-events-part">
      <div id="registered-events-part-head">Registrations/Applications</div>
      <div id="registered-events-cards">
        {events.length === 0 ? (
          <p>No registered events found.</p>
        ) : (
          events.map((event) => (
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
              <button
                className="registered-event-card-info-view-more"
                onClick={() => handleViewDetails(event.id)} 
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
      {statusLoading && <div>Loading quiz status...</div>}
      {statusError && <div>Error fetching quiz status: {statusError}</div>}
    </div>
  );
};

export default Registered;
