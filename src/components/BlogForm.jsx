import { useState } from "react";

export const BlogForm = () => {
  const [newBlog, setNewBlog] = useState("");

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    console.log("newBlog", newBlog);
  };

  return (
    <form onSubmit={addBlog}>
      <input value={newBlog} onChange={handleBlogChange} />
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;
