import React from "react";
import Blog from "./Blog_old";
import PropTypes from "prop-types";

const Blogs = ({ blogs, user }) => {
  return (
    <div data-testid="blogs" className="blogs">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default Blogs;
