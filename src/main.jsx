import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider } from "./Contexts/notificationContext";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </Provider>
);
