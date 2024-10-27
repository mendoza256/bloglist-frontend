import React from "react";
import Blog from "./Blog";
import PropTypes from "prop-types";

const Blogs = ({ blogs, setBlogs }) => {
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
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteBlog={deleteBlog}
          likeBlog={likeBlog}
        />
      ))}
    </>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default Blogs;
