import React from "react";
import Blog from "./Blog";

const Blogs = ({ user, blogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Blogs;
