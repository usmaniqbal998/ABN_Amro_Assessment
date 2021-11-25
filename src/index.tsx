import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./index.css";
import App from "./App";

const baseURL = "https://api.tvmaze.com/";

export const api = axios.create({
  baseURL,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
