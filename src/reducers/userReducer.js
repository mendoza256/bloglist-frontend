import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    },
    set(state, action) {
      return action.payload;
    },
  },
});

export const { login, logout, set } = userSlice.actions;

export const loginUser = (userObject) => {
  return async (dispatch) => {
    const user = await loginService.login(userObject);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(login(user));
  };
};

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(set(user));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(logout);
  };
};

export default userSlice.reducer;
