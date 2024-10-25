import { useState, useEffect, useRef } from "react";

import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import "./styles.css";
import Togglable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [newBlog, setNewBlog] = useState({});
  const blogFormRef = useRef();

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.create(newBlog);
      setBlogs(await blogService.getAll());

      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      setError("Error creating blog:", exception);
    }

    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 5000);

    setNewBlog({});
  };

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
      <h1>Welcome toBlogs</h1>
      <Notification message={message} error={error} />

      {user === null && (
        <Togglable buttonLabel={"Log in"}>
          <LoginForm
            user={user}
            setUser={setUser}
            setMessage={setMessage}
            setError={setError}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              addBlog={addBlog}
              newBlog={newBlog}
              setNewBlog={setNewBlog}
            />
          </Togglable>
          <button onClick={logout}>logout</button>
          <Blogs user={user} blogs={blogs} setBlogs={setBlogs} />
        </div>
      )}
    </>
  );
};

export default App;
