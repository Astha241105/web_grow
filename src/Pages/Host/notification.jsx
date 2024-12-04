import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventNotifications,
  markEventNotificationAsRead,
} from "../../components/store/slices/notificationSlice";

const NotificationsDropdown = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { notifications, status } = useSelector(
    (state) => state.eventNotifications
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch notifications when dropdown opens
    if (isOpen) {
      dispatch(fetchEventNotifications({ page: 0, size: 5 }));
    }
  }, [isOpen, dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markEventNotificationAsRead(notificationId));
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50"
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#008080]">Notifications</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {status === "loading" ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No notifications</div>
      ) : (
        <div className="max-h-64 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                p-3 border-b hover:bg-gray-50 
                ${notification.isRead ? "bg-gray-100" : "bg-white"}
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-[#008080]">
                    {notification.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {notification.message}
                  </p>
                  <small className="text-gray-500 text-xs">
                    {new Date(notification.timestamp).toLocaleString()}
                  </small>
                </div>
                {!notification.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="text-xs text-[#008080] hover:underline ml-2"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
