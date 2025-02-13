import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationProvider } from "./contexts/notificationContext";
import { UserContextProvider } from "./contexts/userContext";
import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </QueryClientProvider>
    </NotificationProvider>
  </Provider>
);
