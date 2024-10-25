import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyles = {
    border: "1px solid black",
    margin: "1rem 0",
    padding: "0.5rem",
  };

  const likeBlog = async () => {
    const newBlog = {
      ...blog,
      user: blog.user?.id || null,
      likes: blog.likes + 1,
    };

    try {
      await blogService.update(blog.id, newBlog);
      setBlogs(await blogService.getAll());
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`);
    await blogService.remove(blog.id);
    setBlogs(await blogService.getAll());
  };

  return (
    <div style={blogStyles}>
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
};

export default Blog;
