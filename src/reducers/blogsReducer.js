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
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
    } catch (error) {
      throw new Error("Error creating blog");
    }
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
    try {
      await blogService.remove(id);
      const newState = getState().blogs.filter((blog) => blog.id !== id);
      dispatch(setBlogs(newState));
    } catch (error) {
      throw new Error("You don't have permission to delete this blog");
    }
  };
};

export default blogsSlice.reducer;
