import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.querySelector("#app");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Router basename="/trackorder">
    <StrictMode>
      <App />
    </StrictMode>
  </Router>
);
