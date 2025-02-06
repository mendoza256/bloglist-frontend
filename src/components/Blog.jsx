import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import blogsService from "../services/blogs";

const Blog = ({ user, handleLikeBlog, handleDeleteBlog }) => {
  const { id } = useParams();
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogsService.getOne(id),
  });

  const blogStyles = {
    border: "1px solid black",
    margin: "1rem 0",
    padding: "0.5rem",
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div style={blogStyles} data-testid={blog.id} className="blog">
      <p>
        <a href={`/blogs/${blog.id}`}>{blog.title}</a> by {blog.author}
      </p>
      <>
        <div>
          <p>{blog.url}</p>
        </div>
        <p>
          <span className="likes" style={{ marginRight: "1rem" }}>
            likes: {blog.likes}
          </span>
          <button className="like" onClick={() => handleLikeBlog(blog)}>
            like
          </button>
          {blog.user.username === user.username && (
            <button className="remove" onClick={() => handleDeleteBlog(blog)}>
              delete
            </button>
          )}
        </p>
        <div>
          <p>{blog.user?.username}</p>
        </div>
      </>
    </div>
  );
};

export default Blog;
