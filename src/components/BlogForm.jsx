import { useState } from "react";
import blogService from "../services/blogs";

export const BlogForm = ({ setBlogs, setMessage, setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.create({ title, author, url });
      setBlogs(await blogService.getAll());

      setMessage(`a new blog ${title} by ${author} added`);
    } catch (exception) {
      setError("Error creating blog:", exception);
    }

    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 5000);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input value={title} onChange={handleBlogChange} id="title" />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input value={author} onChange={handleAuthorChange} id="author" />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input value={url} onChange={handleUrlChange} id="url" />
        </div>
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default BlogForm;
