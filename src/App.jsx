import { useState, useEffect } from "react";

import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  console.log("user", user);

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
      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm user={user} setUser={setUser} />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logout}>logout</button>
          <Blogs user={user} blogs={blogs} />
          <BlogForm />
        </div>
      )}
    </>
  );
};

export default App;
