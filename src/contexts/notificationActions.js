import * as actionTypes from "./types";

const notificationActions = (dispatch) => {
  return {
    notification: {
      createMessage: () => {
        dispatch({ type: actionTypes.CREATE_MESSAGE });
      },
      createError: () => {
        dispatch({ type: actionTypes.CREATE_ERROR });
      },
      reset: () => {
        dispatch({ type: actionTypes.RESET });
      },
    },
  };
};

export default notificationActions;
