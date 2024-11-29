import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../components/store/slices/notificationpart';
import {handleJoinRequestResponse} from "../../components/store/slices/requestresponse"
import './notifiction.css';

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error, actionLoading } = useSelector((state) => state.notifications);

  const authToken = useSelector((state) => state.auth.token); 

  useEffect(() => {
    dispatch(fetchNotifications({ page: 0 })); 
  }, [dispatch]);

  const handleActionClick = (id, responseType) => {
    dispatch(handleJoinRequestResponse({ requestId: id, responseType, authToken }));
  };

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="notification">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <span>{notification.message}</span>
            {notification.message.startsWith('A participant has requested to join your team') && (
              <div className="action-buttons">
                <button
                  onClick={() => handleActionClick(notification.id, 'APPROVED')}
                  disabled={actionLoading}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleActionClick(notification.id, 'REJECTED')}
                  disabled={actionLoading}
                >
                  Decline
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
