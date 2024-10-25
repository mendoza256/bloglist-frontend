import React from "react";
import PropTypes from "prop-types";

const Notification = ({ message, error }) => {
  return (
    <>
      {error && <div className="error">{error}</div>}
      {message && <div className="message">{message}</div>}
    </>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.string,
};

export default Notification;
