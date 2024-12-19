import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNotificationContext } from "../contexts/notificationContext";

const Notification = () => {
  const { state, notificationContextActions } = useNotificationContext();

  useEffect(() => {
    if (state.message || state.error) {
      const timer = setTimeout(() => {
        notificationContextActions.reset();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.message, state.error]);

  return (
    <>
      {state.error && <div className="error">{state.error}</div>}
      {state.message && <div className="message">{state.message}</div>}
    </>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.string,
};

export default Notification;
