import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { setBlogs, appendBlog } = blogsSlice.actions;

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const intitializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogToUpdate = getState().blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    const returnedBlog = await blogService.update(id, updatedBlog);

    dispatch(
      setBlogs(
        getState().blogs.map((blog) => (blog.id !== id ? blog : returnedBlog))
      )
    );
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    await blogService.remove(id);
    const newState = getState().blogs.filter((blog) => blog.id !== id);
    dispatch(setBlogs(newState));
  };
};

export default blogsSlice.reducer;
