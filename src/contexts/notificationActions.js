import * as actionTypes from "./types";

const notificationActions = (dispatch) => {
  return {
    createMessage: (message) => {
      dispatch({
        type: actionTypes.CREATE_MESSAGE,
        payload: message,
      });
    },
    createError: (error) => {
      dispatch({
        type: actionTypes.CREATE_ERROR,
        payload: error,
      });
    },
    reset: () => {
      dispatch({ type: actionTypes.RESET });
    },
  };
};

export default notificationActions;
