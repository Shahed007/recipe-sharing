import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/them";
import AuthProvider from "./context/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
