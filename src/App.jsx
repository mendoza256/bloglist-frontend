import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import "./styles.css";
import Togglable from "./components/Toggable";
import { useDispatch, useSelector } from "react-redux";
import { createNewBlog, intitializeBlogs } from "./reducers/blogsReducer";
import { logoutUser, setUser } from "./reducers/userReducer";
import { useNotificationContext } from "./Contexts/notificationContext";

const App = () => {
  const dispatch = useDispatch();
  const { notificationContextActions } = useNotificationContext();
  const user = useSelector((state) => state.user);
  const [sortByLikes, setSortByLikes] = useState(false);
  const blogFormRef = useRef();
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
      notificationContextActions.createMessage(
        `New blog created: ${newBlog.title} by ${newBlog.author}`
      );

      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      notificationContextActions.createError("Error creating blog:", exception);
    }

    notificationContextActions.reset();
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleSortByLikes = () => {
    setSortByLikes(!sortByLikes);
  };

  const logout = () => {
    dispatch(logoutUser());
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
  };

  return (
    <>
      <h1>Welcome to Blogs</h1>
      <Notification />

      {user === null && (
        <Togglable buttonLabel={"Log in"}>
          <LoginForm
            user={user}
            setError={notificationContextActions.createError}
          />
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
