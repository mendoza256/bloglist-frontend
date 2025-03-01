import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
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
import User from "./components/User";
import Blog from "./components/Blog";

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
    mutationFn: (blog) =>
      blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      }),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", updatedBlog.id] });

      dispatchNotification({
        type: "SET_MESSAGE",
        payload: `Liked ${updatedBlog.title} by ${updatedBlog.author}!`,
      });
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: ({ blog, comment }) => {
      console.log("addCommentMutation", blog, comment);
      return blogService.addComment(blog.id, comment);
    },
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blog", updatedBlog.id] });
      dispatchNotification({
        type: "SET_MESSAGE",
        payload: `Added comment to ${updatedBlog.title}`,
      });
    },
    onError: (error) => {
      dispatchNotification({
        type: "SET_ERROR",
        payload: `Error adding comment: ${error}`,
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
    likeBlogMutation.mutate(blog);
  };

  const handleAddComment = async (blog, comment) => {
    console.log("handleAddComment", blog, comment);
    addCommentMutation.mutate({ blog, comment });
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

  const logout = () => {
    userDispatch({ type: "CLEAR_USER" });
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} logout={logout} />

        <main className="container mx-auto px-4 py-8">
          {user && (
            <div className="space-y-8">
              <Togglable
                buttonLabel="New blog"
                ref={blogFormRef}
                className="mb-8"
              >
                <BlogForm addBlog={addBlog} />
              </Togglable>

              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route
                  path="/blogs/:id"
                  element={
                    <Blog
                      user={user}
                      handleLikeBlog={handleLikeBlog}
                      handleDeleteBlog={handleDeleteBlog}
                      handleAddComment={handleAddComment}
                    />
                  }
                />
                <Route path="/" element={<Blogs blogs={sortedBlogs} />} />
              </Routes>
            </div>
          )}
        </main>

        <footer className="mt-auto py-6 text-center text-sm text-gray-600 border-t border-gray-200">
          Blog app, Department of Computer Science, University of Helsinki 2023
        </footer>
      </div>
    </Router>
  );
};

export default App;
