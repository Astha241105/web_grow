import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../components/store/slices/notificationpart';
import { handleJoinRequestResponse } from '../../components/store/slices/requestresponse';
import './notifiction.css';

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error, actionLoading } = useSelector((state) => state.notifications);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchNotifications({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleActionClick = (id, responseType) => {
    console.log(responseType);
    dispatch(handleJoinRequestResponse({ requestId: id, response: responseType }));
    console.log("done");
  };

  const extractRequestId = (message) => {
    const match = message.match(/request id: (\d+)/);
    return match ? match[1] : null;
  };

  const handleNextPage = () => {
    if (notifications.length > 0) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading notifications.</div>;
  }

  return (
    <div id="notification">
      <ul>
        {notifications.map((notification) => {
          const requestId = extractRequestId(notification.message);
          return (
            <li key={notification.id} className="notification-item">
              <span><strong>{notification.title}:</strong> {notification.message}</span>
              {notification.message.startsWith('A participant has requested to join your team') && requestId && (
                <div className="action-buttons">
                  <button
                    onClick={() => handleActionClick(requestId, 'APPROVED')}
                    disabled={actionLoading}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleActionClick(requestId, 'REJECTED')}
                    disabled={actionLoading}
                  >
                    Decline
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <button onClick={handleNextPage} disabled={loading || actionLoading || notifications.length === 0}>Next</button>
    </div>
  );
};

export default Notifications;
