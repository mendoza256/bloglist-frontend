import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNotification } from "../contexts/notificationContext";

const Notification = () => {
  const [notification, dispatchNotification] = useNotification();

  useEffect(() => {
    if (notification.message || notification.error) {
      const timer = setTimeout(() => {
        dispatchNotification({ type: "CLEAR" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification.message, notification.error, dispatchNotification]);

  if (!notification.message && !notification.error) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in-down">
      {notification.error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
          <div className="flex items-center">
            <div className="py-1">
              <svg
                className="w-6 h-6 mr-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
              </svg>
            </div>
            <div>{notification.error}</div>
          </div>
        </div>
      )}
      {notification.message && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg">
          <div className="flex items-center">
            <div className="py-1">
              <svg
                className="w-6 h-6 mr-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
            </div>
            <div>{notification.message}</div>
          </div>
        </div>
      )}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.string,
};

export default Notification;
