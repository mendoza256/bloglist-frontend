import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {
  const blogStyles = {
    border: "1px solid black",
    margin: "1rem 0",
    padding: "0.5rem",
  };

  return (
    <div style={blogStyles} data-testid={blog.id} className="blog">
      <p>
        <a href={`/blogs/${blog.id}`}>{blog.title}</a> by {blog.author}
      </p>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
