import React, { useState } from "react";
import PropTypes from "prop-types";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useUser } from "../contexts/userContext";

const LoginForm = ({ setError }) => {
  const [, userDispatch] = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      userDispatch({ type: "SET_USER", payload: user });
    } catch (exception) {
      setError({ type: "SET_ERROR", payload: "Wrong credentials" });
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:{" "}
          <input
            type="text"
            name="username"
            data-testid="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          {" "}
          password{" "}
          <input
            type="password"
            data-testid="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />{" "}
        </div>{" "}
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setError: PropTypes.func.isRequired,
};

export default LoginForm;
