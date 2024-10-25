import React from "react";
import Blog from "./Blog";
import PropTypes from "prop-types";

const Blogs = ({ blogs, setBlogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      ))}
    </>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default Blogs;
