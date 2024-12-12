import React from "react";
import Blog from "./Blog";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogsReducer";
import { useNotificationContext } from "../Contexts/notificationContext";

const Blogs = ({ blogs, user }) => {
  const dispatch = useDispatch();
  const { state: notificationState, notificationContextActions } =
    useNotificationContext();
  const { message, error } = notificationState;
  const handleLikeBlog = async (id) => {
    try {
      dispatch(likeBlog(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBlog = async (blog) => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`);
    dispatch(deleteBlog(blog.id));
    notificationContextActions.notification.createMessage(
      `Deleted ${blog.title} by ${blog.author}!`
    );
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
