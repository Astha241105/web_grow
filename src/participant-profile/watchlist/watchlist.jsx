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

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="part-profile-watchlist">
      <div id="part-profile-watchlist-head">Watchlist</div>
      <div id="watchlist-cards-container">
        {favoriteEvents?.data?.map((event) => (
          <div key={event.id} className="watchlist-card">
            <img src={event.imageUrl} alt={event.title} className="watchlist-card-image" />
            <div className="watchlist-card-details">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Category:</strong> {event.category}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Time:</strong> {new Date(event.startTime).toLocaleString()} -{' '}
                {new Date(event.endTime).toLocaleString()}
              </p>
              <p>
                <strong>Mode:</strong> {event.mode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
