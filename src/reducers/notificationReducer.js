import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    createNotifaction(state, action) {
      return action.payload;
    },
    resetNotifiaction(state, action) {
      return "";
    },
  },
});

export const { createNotifaction, resetNotifiaction } =
  notificationReducer.actions;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(createNotifaction(message));

    setTimeout(() => {
      dispatch(resetNotifiaction());
    }, timeout);
  };
};
