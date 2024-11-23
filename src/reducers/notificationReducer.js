import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
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
  notificationSlice.actions;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(createNotifaction(message));

    setTimeout(() => {
      dispatch(resetNotifiaction());
    }, timeout);
  };
};

export default notificationSlice.reducer;
