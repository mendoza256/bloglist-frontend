import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyles = {
    border: "1px solid black",
    margin: "1rem 0",
    padding: "0.5rem",
  };

  return (
    <div style={blogStyles} data-testid={blog.id} className="blog">
      <p>
        {blog.title} by {blog.author}
      </p>
      {showDetails && (
        <>
          <div>
            <p>{blog.url}</p>
          </div>
          <p>
            <span className="likes" style={{ marginRight: "1rem" }}>
              likes: {blog.likes}
            </span>
            <button className="like" onClick={() => handleLikeBlog(blog.id)}>
              like
            </button>
            {blog.user.username == user.username && (
              <button className="remove" onClick={() => handleDeleteBlog(blog)}>
                delete
              </button>
            )}
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
  handleLikeBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
