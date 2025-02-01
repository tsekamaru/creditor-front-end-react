import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { IdsProvider } from "./contexts/IdsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <IdsProvider>
        <App />
      </IdsProvider>
    </Router>
  </StrictMode>
);
