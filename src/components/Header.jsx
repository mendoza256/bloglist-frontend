import { Link } from "react-router-dom";
import React from "react";
import Notification from "./Notification";
import Toggable from "./Toggable";
import LoginForm from "./LoginForm";
import { useNotification } from "../contexts/notificationContext";

function Header({ user, logout }) {
  const [_, dispatchNotification] = useNotification();

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
        {user && (
          <span data-testid="user-logged-in">{user.name} logged in</span>
        )}
        {user === null && (
          <Toggable buttonLabel={"Log in"}>
            <LoginForm user={user} setError={dispatchNotification} />
          </Toggable>
        )}
        {user && <button onClick={logout}>logout</button>}
      </div>
      <h1>Welcome to Blogs</h1>
      <Notification />
    </>
  );
}

export default Header;
