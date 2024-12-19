import React from "react";
import Blog from "./Blog";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogsReducer";
import { useNotificationContext } from "../Contexts/notificationContext";

const Blogs = ({ blogs, user }) => {
  const dispatch = useDispatch();
  const { notificationContextActions } = useNotificationContext();
  const handleLikeBlog = async (id) => {
    try {
      dispatch(likeBlog(id));
    } catch (error) {
      notificationContextActions.createError(error);
    }
  };

  const handleDeleteBlog = async (blog) => {
    if (!window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      return;
    }

    try {
      dispatch(deleteBlog(blog.id));
      notificationContextActions.createMessage(
        `Deleted ${blog.title} by ${blog.author}!`
      );
    } catch (error) {
      notificationContextActions.createError(
        "You don't have permission to delete this blog"
      );
    }
  };

  return (
    <div data-testid="blogs" className="blogs">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDeleteBlog={handleDeleteBlog}
          handleLikeBlog={handleLikeBlog}
          user={user}
        />
      ))}
    </div>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default Blogs;
