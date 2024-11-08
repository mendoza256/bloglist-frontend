import PropTypes from "prop-types";
import { useState } from "react";

export const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({});

  const createBlog = (event) => {
    event.preventDefault();
    addBlog(newBlog);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            aria-label="title"
            data-testid="title"
            id="title"
            type="text"
            placeholder="title"
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            aria-label="author"
            data-testid="author"
            id="author"
            type="text"
            placeholder="author"
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input
            aria-label="url"
            data-testid="url"
            type="text"
            placeholder="url"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
            id="url"
          />
        </div>
        <button type="submit">save</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
