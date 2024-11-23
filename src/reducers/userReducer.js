import { createSlice } from "@reduxjs/toolkit";

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

export default userSlice.reducer;
