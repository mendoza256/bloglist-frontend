import React from "react";
import Blog from "./Blog";
import PropTypes from "prop-types";

const Blogs = ({
  blogs,
  user,
  handleDeleteBlog,
  handleLikeBlog,
  handleSortByLikes,
}) => {
  return (
    <div data-testid="blogs" className="blogs">
      <button onClick={handleSortByLikes}>Sort by Likes (Descending)</button>
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
  handleSortByLikes: PropTypes.func.isRequired,
};

export default Blogs;
