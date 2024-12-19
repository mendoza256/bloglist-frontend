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

  return (
    <>
      {notification.error && <div className="error">{notification.error}</div>}
      {notification.message && (
        <div className="message">{notification.message}</div>
      )}
    </>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.string,
};

export default Notification;
