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
  },
});

export const { login, logout } = userSlice.actions;

// TODO add user login, logout, remove setUsers
export const loginUser = (userObject) => {
  return async (dispatch) => {
    const user = await loginService.login(userObject);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(login(user));
  };
};

export default userSlice.reducer;
