import React from "react";

const Notification = ({ message, error }) => {
  return (
    <>
      {error && <div className="error">{error}</div>}
      {message && <div className="message">{message}</div>}
    </>
  );
};

export default Notification;
