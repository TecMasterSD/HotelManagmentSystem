import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store  from "./ReducState/Store.jsx"; // <- check export type
import "./index.css";
import '@fontsource/playfair-display';
import '@fontsource/playfair-display/700.css';
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
