import React from "react";
import Blog from "./Blog";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { intitializeBlogs } from "../reducers/blogsReducer";

const Blogs = ({ blogs, user }) => {
  const dispatch = useDispatch();
  const likeBlog = async (id) => {
    console.log("blogid", id);
    const blog = blogs.find((blog) => blog.id === id);
    console.log("blog", blog);

    const updatedBlog = {
      ...blog,
      user: blog.user?.id || null,
      likes: blog.likes + 1,
    };

    try {
      await blogService.update(blog.id, updatedBlog);
      dispatch(intitializeBlogs());
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (blog) => {
    console.log("delete", blog);
    window.confirm(`Delete ${blog.title} by ${blog.author}?`);
    await blogService.remove(blog.id);
    dispatch(intitializeBlogs());
  };

  return (
    <div data-testid="blogs" className="blogs">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteBlog={deleteBlog}
          likeBlog={likeBlog}
          user={user}
        />
      ))}
    </div>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default Blogs;
