import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import blogsService from "../services/blogs";
import { useState } from "react";

const Blog = ({ user, handleLikeBlog, handleDeleteBlog, handleAddComment }) => {
  const [comment, setComment] = useState("");
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

  if (!blog) return <p>Blog not found</p>;

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
          <input
            type="text"
            placeholder="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddComment(blog, comment);
              setComment("");
            }}
          >
            add comment
          </button>
        </div>
        <div>
          <p>{blog.user?.username}</p>
        </div>
        {blog.comments.length > 0 && (
          <ul>
            {blog.comments.map((comment, i) => (
              <li key={i}>{comment}</li>
            ))}
          </ul>
        )}
      </>
    </div>
  );
};

export default Blog;
