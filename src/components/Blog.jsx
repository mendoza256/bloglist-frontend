import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyles = {
    border: "1px solid black",
    margin: "1rem 0",
    padding: "0.5rem",
  };

  console.log("data", blog);

  return (
    <div style={blogStyles}>
      <p>
        {blog.title} by {blog.author}
      </p>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>likes: {blog.likes}</p>
          <p>{blog.user.username}</p>
        </>
      )}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "show"}
      </button>
    </div>
  );
};

export default Blog;
