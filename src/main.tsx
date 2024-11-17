// import { StrictMode } from 'react'
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import"./config/configureMobX"
import "./styles/styles.scss";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>

  <BrowserRouter>
      <App />
  </BrowserRouter>
  /* </StrictMode>, */
);

if(module.hot) {
  module.hot.accept()
}