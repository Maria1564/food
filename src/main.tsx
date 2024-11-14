// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App/";

import"./config/configureMobX"
import "./styles/styles.scss";
import UrlParamsProvider from "./App/provider";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>

  <BrowserRouter>
    <UrlParamsProvider>
      <App />
    </UrlParamsProvider>
  </BrowserRouter>
  /* </StrictMode>, */
);
