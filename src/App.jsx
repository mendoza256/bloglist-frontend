import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import "./styles.css";
import Togglable from "./components/Toggable";
import { useDispatch } from "react-redux";
import { intitializeBlogs } from "./reducers/blogsReducer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./contexts/userContext";
import { useNotification } from "./contexts/notificationContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Users from "./components/Users";

const App = () => {
  const [user, userDispatch] = useUser();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [_, dispatchNotification] = useNotification();
  const [sortByLikes, setSortByLikes] = useState(false);
  const blogFormRef = useRef();

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      dispatchNotification({
        type: "SET_MESSAGE",
        payload: `New blog created: ${newBlog.title} by ${newBlog.author}`,
      });
      blogFormRef.current.toggleVisibility();
    },
    onError: (error) => {
      dispatchNotification({
        type: "SET_ERROR",
        payload: `Error creating blog: ${error}`,
      });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, deletedBlogId) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      const deletedBlog = blogs.find((blog) => blog.id === deletedBlogId);
      dispatchNotification({
        type: "SET_MESSAGE",
        payload: `Deleted ${deletedBlog.title} by ${deletedBlog.author}!`,
      });
    },
    onError: (error) => {
      dispatchNotification({
        type: "SET_ERROR",
        payload: `You don't have permission to delete this blog, error: ${error}`,
      });
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (_, likedBlogId) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      const likedBlog = blogs.find((blog) => blog.id === likedBlogId);
      dispatchNotification({
        type: "SET_MESSAGE",
        payload: `Liked ${likedBlog.title} by ${likedBlog.author}!`,
      });
    },
  });

  const handleDeleteBlog = async (blog) => {
    if (!window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      return;
    }
    deleteBlogMutation.mutate(blog.id);
  };

  const handleLikeBlog = async (blog) => {
    likeBlogMutation.mutate(blog.id);
  };

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  useEffect(() => {
    dispatch(intitializeBlogs());
  }, []);

  const addBlog = async (newBlog) => {
    createBlogMutation.mutate(newBlog);
    setTimeout(() => {
      dispatchNotification({ type: "CLEAR" });
    }, 3000);
  };

  const sortedBlogs = sortByLikes
    ? [...blogs].sort((a, b) => b.likes - a.likes)
    : blogs;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SET_USER", payload: user });
      blogService.setToken(user.token);

      dispatchNotification({
        type: "SET_MESSAGE",
        payload: `${user.name} logged in`,
      });
      setTimeout(() => {
        dispatchNotification({ type: "CLEAR" });
      }, 3000);
    }
  }, []);

  const handleSortByLikes = () => {
    setSortByLikes(!sortByLikes);
  };

  const logout = () => {
    userDispatch({ type: "CLEAR_USER" });
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
  };

  return (
    <Router>
      <Header />

      {user === null && (
        <Togglable buttonLabel={"Log in"}>
          <LoginForm user={user} setError={dispatchNotification} />
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

          <Routes>
            <Route path="/users" element={<Users blogs={sortedBlogs} />} />
            <Route
              path="/"
              element={
                <Blogs
                  blogs={sortedBlogs}
                  user={user}
                  handleDeleteBlog={handleDeleteBlog}
                  handleLikeBlog={handleLikeBlog}
                />
              }
            />
          </Routes>
        </div>
      )}
      <div>
        Blog app, Department of Computer Science, University of Helsinki 2023
      </div>
    </Router>
  );
};

export default App;
