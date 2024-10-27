import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyles = {
    border: "1px solid black",
    margin: "1rem 0",
    padding: "0.5rem",
  };

  return (
    <div style={blogStyles} className="blog">
      <p>
        {blog.title} by {blog.author}
      </p>
      {showDetails && (
        <>
          <div>
            <p>{blog.url}</p>
          </div>
          <p>
            <span style={{ marginRight: "1rem" }}>likes: {blog.likes}</span>
            <button onClick={likeBlog}>like</button>
            <button onClick={deleteBlog}>delete</button>
          </p>
          <div>
            <p>{blog.user?.username}</p>
          </div>
        </>
      )}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "show"}
      </button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
};

export default Blog;
