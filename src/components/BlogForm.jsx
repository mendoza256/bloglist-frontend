import PropTypes from "prop-types";

export const BlogForm = ({ newBlog, setNewBlog, addBlog }) => {
  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
            id="title"
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
            id="author"
          />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input
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
