import React from "react";
import Blog from "./Blog";
import PropTypes from "prop-types";

const Blogs = ({ blogs, user, handleDeleteBlog, handleLikeBlog }) => {
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
