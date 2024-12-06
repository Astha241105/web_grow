import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteEvents } from '../../components/store/slices/favouriteevents'; 
import './watchlist.css';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { data: favoriteEvents, status, error } = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavoriteEvents());
  }, [dispatch]);

  const handleViewDetails = (eventId) => {
    navigate('/event', {
      state: {eventId}, 
    }); };
    
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="part-profile-watchlist">
      <div id="part-profile-watchlist-head">Watchlist</div>
      <div id="registered-events-cards">
        {favoriteEvents?.data?.map((event) => (
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
          ))}
      </div>
    </div>
  );
};

export default Watchlist;
