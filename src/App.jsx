import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import "./styles.css";
import Togglable from "./components/Toggable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { createNewBlog, intitializeBlogs } from "./reducers/blogsReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [sortByLikes, setSortByLikes] = useState(false);
  const blogFormRef = useRef();
  const message = useSelector((state) => state.notification);
  const blogs = useSelector((state) =>
    sortByLikes
      ? state.blogs.toSorted((a, b) => b.likes - a.likes)
      : state.blogs
  );

  useEffect(() => {
    dispatch(intitializeBlogs());
  }, []);

  const addBlog = async (newBlog) => {
    try {
      dispatch(createNewBlog(newBlog));
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          2000
        )
      );

      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      setError("Error creating blog:", exception);
    }

    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleSortByLikes = () => {
    setSortByLikes(!sortByLikes);
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <>
      <h1>Welcome to Blogs</h1>
      <Notification message={message} error={error} />

      {user === null && (
        <Togglable buttonLabel={"Log in"}>
          <LoginForm user={user} setUser={setUser} setError={setError} />
        </Togglable>
      )}
      {user && (
        <div>
          <p data-testid="user-logged-in">{user.name} logged in</p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <button onClick={logout}>logout</button>
          <button onClick={handleSortByLikes}>
            Sort by Likes (Descending)
          </button>

          <Blogs blogs={blogs} user={user} />
        </div>
      )}
      <div>
        Blog app, Department of Computer Science, University of Helsinki 2023
      </div>
    </>
  );
};

export default App;
