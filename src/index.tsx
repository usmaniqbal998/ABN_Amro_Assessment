import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

const baseURL = "https://api.tvmaze.com/";

export const api = axios.create({
  baseURL,
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
