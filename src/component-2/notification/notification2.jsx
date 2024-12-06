import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../components/store/slices/notificationpart';
import { handleJoinRequestResponse } from '../../components/store/slices/requestresponse';
import './notifiction.css';

const Notification2= () => {
    const dispatch = useDispatch();
    const { notifications, loading, error, actionLoading } = useSelector((state) => state.notifications);
  
    useEffect(() => {
      dispatch(fetchNotifications({ page: 0 })); 
    }, [dispatch]);
  
    const handleActionClick = (id, responseType) => {
      console.log(responseType)
      dispatch(handleJoinRequestResponse({ requestId: id, response:responseType }));
      console.log("done")
    };
  
    const extractRequestId = (message) => {
      const match = message.match(/request id: (\d+)/); 
      return match ? match[1] : null; 
    };
  
    if (loading) {
      return <div></div>;
    }
  
    if (error) {
      return <div></div>;
    }
  
    return (
      <div id="notification2" >
        <ul>
          {notifications.map((notification) => {
            const requestId = extractRequestId(notification.message);
            return (
              <li key={notification.id} className="notification-item">
                <span>{notification.message}</span>
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
      </div>
    );
  };
  

export default Notification2
