import React from "react";
import ReactDOM from "react-dom";
import App from "./Container/App.jsx";

// The DOM element the main app will be attched to
const rootElement = document.querySelector("#app");

export default ReactDOM.render(
  <>
    <App />
  </>,
  rootElement
);
