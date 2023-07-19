import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import "fomantic-ui-css/fomantic-ui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
