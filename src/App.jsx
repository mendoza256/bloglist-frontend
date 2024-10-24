import { useState, useEffect } from "react";

import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import "./styles.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <>
      <h1>Blogs</h1>
      <Notification message={message} error={error} />

      {user === null ? (
        <LoginForm
          user={user}
          setUser={setUser}
          setMessage={setMessage}
          setError={setError}
        />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logout}>logout</button>
          <Blogs user={user} blogs={blogs} setBlogs={setBlogs} />
          <BlogForm
            setBlogs={setBlogs}
            setMessage={setMessage}
            setError={setError}
          />
        </div>
      )}
    </>
  );
};

export default App;
