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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-800">Error loading blog</p>
      </div>
    );

  if (!blog)
    return (
      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-800">Blog not found</p>
      </div>
    );

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{blog.title}</h2>
        <p className="text-gray-600">by {blog.author}</p>
      </div>

      <div className="space-y-4">
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 break-all"
        >
          {blog.url}
        </a>

        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {blog.likes} {blog.likes === 1 ? "like" : "likes"}
          </span>
          <button
            onClick={() => handleLikeBlog(blog)}
            className="px-3 py-1 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
          >
            Like
          </button>
          {blog.user.username === user.username && (
            <button
              onClick={() => handleDeleteBlog(blog)}
              className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
            >
              Delete
            </button>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddComment(blog, comment);
                setComment("");
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Comment
            </button>
          </div>

          {blog.comments.length > 0 ? (
            <ul className="space-y-2">
              {blog.comments.map((comment, i) => (
                <li key={i} className="p-3 bg-gray-50 rounded-md text-gray-700">
                  {comment}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
