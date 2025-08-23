import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // ok if missing; remove this line if you don't have it

const root = document.getElementById("root")!;
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
