import { Link } from "react-router-dom";
import React from "react";
import Notification from "./Notification";

function Header() {
  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
      </div>
      <h1>Welcome to Blogs</h1>
      <Notification />
    </>
  );
}

export default Header;
