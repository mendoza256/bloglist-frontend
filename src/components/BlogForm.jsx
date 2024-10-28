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
  newBlog: PropTypes.object.isRequired,
  setNewBlog: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
