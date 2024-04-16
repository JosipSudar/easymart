import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./state/store.js";
import { DarkModeProvider } from "./state/DarkMode.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeProvider>
  </React.StrictMode>
);
