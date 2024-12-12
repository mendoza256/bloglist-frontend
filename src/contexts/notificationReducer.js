import * as actionTypes from "./types";
export const notificationInitialState = {
  error: "",
  message: "",
};

export function notificationReducer(state, action) {
  console.log("notificationReducer", state, action);
  switch (action.type) {
    case actionTypes.CREATE_MESSAGE:
      return { ...state, message: action.payload };
    case actionTypes.CREATE_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.RESET:
      return { ...state, message: "", error: "" };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
