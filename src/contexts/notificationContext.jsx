import { useReducer, createContext, useContext, useMemo } from "react";
import {
  notificationInitialState,
  notificationReducer,
} from "./notificationReducer";
import notificationActions from "./notificationActions";

const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    notificationInitialState
  );
  const value = useMemo(() => [state, dispatch], [state]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  const [state, dispatch] = context;
  const notificationContextActions = notificationActions(dispatch);
  return { state, notificationContextActions };
};

export { useNotificationContext, NotificationContextProvider };
